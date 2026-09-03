<?php
/**
 * Plugin Name: BuddhaPets — Store API CORS
 * Description: Lets the Next.js storefront read and write the WooCommerce cart.
 * Version: 1.1.0
 *
 * The storefront (buddhapets.co.za) and this CMS (cms.buddhapets.co.za) are
 * different ORIGINS but the same SITE, so the browser sends Woo's session cookie
 * on these requests without SameSite=None — which is why the cart survives the
 * hop, and why sending a customer to /checkout later still finds their basket.
 * What the browser will NOT do is let JavaScript read the response unless this
 * file says so.
 *
 * The allow-list is exact and hard-coded on purpose. Reflecting an arbitrary
 * Origin back alongside Allow-Credentials: true would let any site on the
 * internet make authenticated requests as a signed-in customer.
 *
 * Headers are emitted from `init` rather than only from the REST server's
 * `rest_pre_serve_request` filter: on this install that filter did not fire for
 * ordinary GETs, so preflight succeeded while the real response came back
 * bare — the most confusing possible failure, because curl looks fine and only
 * the browser complains. `init` runs for every request, including preflight.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const BUDDHAPETS_ALLOWED_ORIGINS = [
	'https://buddhapets.co.za',
	'https://www.buddhapets.co.za',
];

function buddhapets_cors_origin(): ?string {
	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? trim( (string) $_SERVER['HTTP_ORIGIN'] ) : '';
	if ( $origin === '' ) {
		return null;
	}
	return in_array( $origin, BUDDHAPETS_ALLOWED_ORIGINS, true ) ? $origin : null;
}

function buddhapets_is_rest_request(): bool {
	$path = isset( $_SERVER['REQUEST_URI'] ) ? (string) $_SERVER['REQUEST_URI'] : '';
	return strpos( $path, '/wp-json/' ) !== false;
}

function buddhapets_send_cors_headers(): void {
	$origin = buddhapets_cors_origin();
	if ( $origin === null ) {
		return;
	}

	header( 'Access-Control-Allow-Origin: ' . $origin );
	header( 'Access-Control-Allow-Credentials: true' );
	header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Content-Type, Nonce, Cart-Token, X-WP-Nonce' );

	// Without this the storefront cannot read the nonce, and every write fails.
	header( 'Access-Control-Expose-Headers: Nonce, Cart-Token, X-WC-Store-API-Nonce' );

	// The response body varies by Origin, so no shared cache may reuse it.
	header( 'Vary: Origin', false );
}

/**
 * Every REST request, including the OPTIONS preflight (which never reaches a
 * REST controller and so must be answered and terminated here).
 */
add_action(
	'init',
	function () {
		if ( ! buddhapets_is_rest_request() || buddhapets_cors_origin() === null ) {
			return;
		}

		buddhapets_send_cors_headers();

		if ( isset( $_SERVER['REQUEST_METHOD'] ) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
			header( 'Access-Control-Max-Age: 600' );
			status_header( 204 );
			exit;
		}
	},
	1
);

/**
 * Belt and braces. WordPress installs its own CORS handler that would otherwise
 * overwrite ours with a wildcard; replace it rather than fight it.
 */
add_action(
	'rest_api_init',
	function () {
		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
		add_filter(
			'rest_pre_serve_request',
			function ( $served ) {
				buddhapets_send_cors_headers();
				return $served;
			},
			10,
			1
		);
	},
	15
);
