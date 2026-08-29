import "server-only";
import type { Answers } from "./quiz";

/**
 * Persistence for Calm Quiz results.
 *
 * The quiz ships before the database does, so this deliberately degrades:
 * with DATABASE_URL set it writes through Prisma; without one it logs the
 * lead and returns. A customer must never lose their plan because storage
 * isn't wired up yet.
 *
 * To switch storage on:
 *   1. npm install prisma @prisma/client
 *   2. set DATABASE_URL (see .env.example)
 *   3. npx prisma migrate dev --name init
 * The dynamic import below then resolves and writes start landing.
 */

export type QuizRecord = {
  answers: Answers;
  email: string | null;
  petName: string | null;
  score: number;
  planSlug: string;
  planName: string;
  petType: "DOG" | "CAT" | "BOTH";
};

type PrismaLike = {
  quizResult: { create(args: { data: Record<string, unknown> }): Promise<{ id: string }> };
};

let clientPromise: Promise<PrismaLike | null> | null = null;

async function getClient(): Promise<PrismaLike | null> {
  if (!process.env.DATABASE_URL) return null;

  clientPromise ??= (async () => {
    try {
      // The specifier is built at runtime on purpose: the package is optional
      // until week 4, and TypeScript must not require it to be installed for
      // the app to type-check or build.
      const specifier = ["@prisma", "client"].join("/");
      const mod = (await import(specifier)) as { PrismaClient: new () => PrismaLike };
      return new mod.PrismaClient();
    } catch {
      console.warn("[quiz] DATABASE_URL is set but @prisma/client is not installed.");
      return null;
    }
  })();

  return clientPromise;
}

export async function saveQuizResult(record: QuizRecord): Promise<{ stored: boolean }> {
  const prisma = await getClient();

  if (!prisma) {
    console.info(
      `[quiz] ${record.planName} · score ${record.score} · ${record.email ?? "no email"} (not persisted — no database configured)`,
    );
    return { stored: false };
  }

  try {
    await prisma.quizResult.create({
      data: {
        answers: record.answers as unknown as object,
        email: record.email,
        petName: record.petName,
        petType: record.petType,
        score: record.score,
        planSlug: record.planSlug,
        planName: record.planName,
      },
    });
    return { stored: true };
  } catch (error) {
    // Storage failing is our problem, not the customer's — log and carry on.
    console.error("[quiz] failed to store result:", error);
    return { stored: false };
  }
}
