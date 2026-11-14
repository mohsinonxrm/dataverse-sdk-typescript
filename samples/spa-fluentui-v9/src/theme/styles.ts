import { createFocusOutlineStyle, makeStyles, tokens } from "@fluentui/react-components";

/** Styles that several components share, so each is defined once. */
export const useCommonStyles = makeStyles({
  /** Read by screen readers, not shown. */
  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  /** Code, ids and URLs in running text. */
  mono: { fontFamily: tokens.fontFamilyMonospace, overflowWrap: "anywhere" },
  /** Secondary text: hints, counts, empty states. */
  muted: { color: tokens.colorNeutralForeground3 },
  /**
   * A scrollable region that takes keyboard focus (so it can be scrolled from the keyboard), with
   * Fluent's focus indicator: shown for keyboard focus only, and drawn inside the region.
   */
  focusableRegion: createFocusOutlineStyle({
    style: { outlineOffset: `calc(${tokens.strokeWidthThick} * -1)` },
  }),
});
