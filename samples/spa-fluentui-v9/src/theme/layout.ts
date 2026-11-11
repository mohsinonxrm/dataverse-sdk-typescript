/**
 * Layout constants. Fluent's tokens cover colour, type, spacing, radii and elevation, but not
 * breakpoints or content widths, so they live here once instead of as literals in every file.
 * The widths are in rem so they follow the user's font size.
 */

/** Below 768px (Fluent 2's "medium" window): one column, compact header, tighter padding. */
export const SMALL = "(max-width: 47.99em)";

/** Below 1024px (Fluent 2's "large" window): the navigation becomes an overlay drawer. */
export const MEDIUM = "(max-width: 63.99em)";

/** `@media` keys for `makeStyles`. */
export const MEDIA_SMALL = `@media ${SMALL}`;
export const MEDIA_MEDIUM = `@media ${MEDIUM}`;

/** The widest a page's content grows, so lines and grids stay readable on wide screens. */
export const PAGE_MAX_WIDTH = "80rem";

/** The longest comfortable line for running text. */
export const TEXT_MAX_WIDTH = "70ch";

/** Width of a sign-in or environment card. */
export const DIALOG_PAGE_WIDTH = "40rem";
