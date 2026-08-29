import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { CalmQuiz } from "@/components/quiz/CalmQuiz";

export const metadata: Metadata = {
  title: "The Calm Quiz",
  description:
    "Two minutes on your pet's stress signals, and we'll match them to a Zen Plan — a named ritual built for exactly that pattern.",
};

export default function QuizPage() {
  return (
    <>
      <Header />
      <main className="bg-mist">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-gutter lg:py-24">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.15]">
              How <span className="accent">zen</span> is your pet?
            </h1>
            <p className="max-w-[52ch] text-[15px] leading-[1.8] text-body">
              Six questions, about two minutes. No right answers — just tell us what you actually
              see, and we&rsquo;ll build the ritual around it.
            </p>
          </div>
          <CalmQuiz />
        </div>
      </main>
      <Footer />
    </>
  );
}
