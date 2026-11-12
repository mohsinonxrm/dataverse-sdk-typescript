/**
 * The helper types the per-form types (`formLayouts`, #430) use: an Xrm collection whose `get()`
 * takes the names of its items, a tab whose sections are named, and `formContext.ui` whose tabs
 * are named. Generated once into `forms/`, next to the forms; the forms index doesn't re-export it.
 */

/** The module, in `forms/`, without the file suffix and extension. */
export const FORM_LAYOUT_MODULE = "form-layout";

/** The helper type the form files import. */
export const FORM_LAYOUT_UI = "FormLayoutUi";

/** The source of `forms/form-layout.ts`. */
export function formLayoutHelpersSource(): string {
  return `/// <reference types="xrm" />

/**
 * An Xrm collection whose \`get()\` takes the names of its items (\`Items\`, by name) and returns
 * the item (not \`null\`: it's on the form). By index or with a delegate, it's an
 * \`Xrm.Collection.ItemCollection<T>\`.
 */
export type FormLayoutCollection<T, Items> = Omit<Xrm.Collection.ItemCollection<T>, "get"> & {
  /** The item of that name. */
  get<K extends keyof Items>(name: K): Items[K];
  /** The item at that index, or \`null\`. */
  get(index: number): T | null;
  /** Every item, or those \`delegate\` matches. */
  get(delegate?: Xrm.Collection.MatchingDelegate<T>): T[];
};

/** A tab whose \`sections.get()\` takes the names of its sections. */
export type FormLayoutTab<Sections extends string> = Omit<Xrm.Controls.Tab, "sections"> & {
  sections: FormLayoutCollection<Xrm.Controls.Section, Record<Sections, Xrm.Controls.Section>>;
};

/**
 * \`formContext.ui\` of a form whose \`tabs.get()\` takes the names of its tabs (\`Tabs\`: each tab's
 * name, with the names of its sections).
 */
export type FormLayoutUi<Tabs> = Omit<Xrm.Ui, "tabs"> & {
  tabs: FormLayoutCollection<
    Xrm.Controls.Tab,
    { [K in keyof Tabs]: FormLayoutTab<Extract<Tabs[K], string>> }
  >;
};
`;
}
