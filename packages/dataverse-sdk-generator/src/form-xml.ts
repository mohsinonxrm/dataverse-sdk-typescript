/**
 * Form layouts (#430): a model-driven form's tabs, sections and controls, read from the FormXml of
 * its `systemform` record.
 *
 * In the FormXml, `<tabs>` holds the body: `<tab name>` → `<columns>` → `<column>` → `<sections>`
 * → `<section name>` → `<rows>` → `<row>` → `<cell>` → `<control id classid datafieldname>`. The
 * `<header>` has rows of cells with controls too (ids `header_<column>`); the `<footer>` is left
 * out, since `getControl()` reaches only the body and the header. A control's `id` is the name the
 * Client API gives it: the column's logical name, `<column>1`, `<column>2`, … for a column on the
 * form more than once, `header_<column>` in the header.
 */
import * as xmljs from "xml-js";
import type { SystemFormRecord } from "./metadata-service.js";
import type {
  FormControlKind,
  FormControlType,
  FormLayoutKind,
  FormLayoutType,
  FormSectionType,
  FormTabType,
} from "./types.js";

/** The `classid` of the controls that aren't bound to a column, upper case without braces. */
const CONTROL_CLASSES: Readonly<Record<string, FormControlKind>> = {
  "E7A81278-8635-4D9E-8D4D-59480B391C5B": "subgrid",
  "9FDF5F91-88B1-47F4-AD53-C11EFC01A01D": "webResource",
  "FD2A7985-3187-444E-908D-6624B21F69C0": "iframe",
  "5C5600E0-1D6E-4205-A272-BE80DA87FD42": "quickView",
  "06375649-C143-495E-A496-C962E5B4488E": "timeline",
};

/** `systemform.type` of the forms read. */
const FORM_KINDS: Readonly<Record<number, FormLayoutKind>> = { 2: "main", 7: "quickCreate" };

/** The parts of an xml-js element this module reads. */
interface XmlElement {
  type?: string;
  name?: string;
  attributes?: Record<string, string | number | undefined>;
  elements?: XmlElement[];
}

/** The tabs and controls of a FormXml document (controls without their column types). */
export function parseFormXml(formXml: string): {
  tabs: FormTabType[];
  controls: Array<Omit<FormControlType, "ColumnType">>;
} {
  const root = xmljs.xml2js(formXml, { compact: false }) as XmlElement;
  const tabs: FormTabType[] = [];
  const controls: Array<Omit<FormControlType, "ColumnType">> = [];
  const ids = new Set<string>();

  const visit = (element: XmlElement, location: "body" | "header" | undefined): void => {
    if (element.type !== undefined && element.type !== "element") return;
    const name = element.name?.toLowerCase();
    if (name === "footer") return;
    if (name === "header") location = "header";
    else if (name === "tabs") location = "body";

    if (name === "control") {
      const id = attribute(element, "id");
      if (location === undefined || id === undefined || ids.has(id)) return;
      ids.add(id);
      const classId = (attribute(element, "classid") ?? "").replace(/[{}]/g, "").toUpperCase();
      const dataField = attribute(element, "datafieldname");
      const kind = CONTROL_CLASSES[classId] ?? (dataField !== undefined ? "column" : "other");
      controls.push({
        Id: id,
        Location: location,
        Kind: kind,
        ...(kind === "column" && dataField !== undefined ? { DataField: dataField } : {}),
      });
      return;
    }

    if (name === "tab" && location === "body") {
      const tabName = attribute(element, "name");
      if (tabName !== undefined) {
        const sections: FormSectionType[] = [];
        collect(element, "section", (section) => {
          const sectionName = attribute(section, "name");
          if (sectionName !== undefined && !sections.some((s) => s.Name === sectionName)) {
            sections.push(withLabel<FormSectionType>({ Name: sectionName }, section));
          }
        });
        if (!tabs.some((t) => t.Name === tabName)) {
          tabs.push(withLabel<FormTabType>({ Name: tabName, Sections: sections }, element));
        }
      }
    }

    for (const child of element.elements ?? []) visit(child, location);
  };
  visit(root, undefined);

  return { tabs, controls };
}

/**
 * A `systemform` record as a form layout, each column control with the type of its column
 * (`AttributeTypeName` by logical name); `undefined` for a record that isn't a main or quick
 * create form, or has no id or FormXml.
 */
export function toFormLayout(
  record: SystemFormRecord,
  columnTypes: ReadonlyMap<string, string>
): FormLayoutType | undefined {
  const kind = record.type === undefined ? undefined : FORM_KINDS[record.type];
  if (kind === undefined || !record.formid || !record.formxml) return undefined;
  const { tabs, controls } = parseFormXml(record.formxml);
  return {
    FormId: record.formid,
    Name: record.name ?? record.formid,
    Kind: kind,
    Tabs: tabs,
    Controls: controls.map((control) => {
      const columnType =
        control.DataField === undefined ? undefined : columnTypes.get(control.DataField);
      return columnType === undefined ? control : { ...control, ColumnType: columnType };
    }),
  };
}

/** Main forms first, then quick create forms; each by name, then id. */
export function compareFormLayouts(a: FormLayoutType, b: FormLayoutType): number {
  if (a.Kind !== b.Kind) return a.Kind === "main" ? -1 : 1;
  return compareCodeUnits(a.Name, b.Name) || compareCodeUnits(a.FormId, b.FormId);
}

function compareCodeUnits(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** An attribute's value, or `undefined` when it's missing or empty. */
function attribute(element: XmlElement, name: string): string | undefined {
  const value = element.attributes?.[name];
  return value === undefined || value === "" ? undefined : String(value);
}

/** Call `found` for every descendant element named `name` (not looking inside those). */
function collect(element: XmlElement, name: string, found: (element: XmlElement) => void): void {
  for (const child of element.elements ?? []) {
    if (child.type !== undefined && child.type !== "element") continue;
    if (child.name?.toLowerCase() === name) found(child);
    else collect(child, name, found);
  }
}

/**
 * `item` with the `Label` of `element`'s own `<labels>`: the English one (1033) when there is
 * one, else the first.
 */
function withLabel<T extends { Label?: string }>(item: T, element: XmlElement): T {
  const labels = (element.elements ?? [])
    .filter((e) => e.name?.toLowerCase() === "labels")
    .flatMap((e) => e.elements ?? [])
    .filter((e) => e.name?.toLowerCase() === "label");
  const label =
    labels.find((l) => attribute(l, "languagecode") === "1033") ?? labels.at(0) ?? undefined;
  const text = label === undefined ? undefined : attribute(label, "description");
  return text === undefined ? item : { ...item, Label: text };
}
