/**
 * Which solutions each operation comes from (#304), recorded when the snapshot is taken.
 *
 * The prebuilt actions, functions and messages packages hold the platform, Sales and Customer
 * Service operations only. The snapshot org has more installed (Contact Center, Customer Insights -
 * Journeys, …), so `snapshot` also saves `metadata/operation-solutions.json`: for each operation in
 * the `$metadata`, the Microsoft-managed solutions it is a component of. `regen` then keeps the
 * operations whose solutions are in `metadata/prebuilt-solutions.json` (`src/prebuilt.ts`).
 *
 * How an operation is matched to its solutions, read-only through the Web API:
 *
 * 1. `sdkmessagerequest.name` is the operation's Web API name (`WinOpportunity`), and its
 *    `sdkmessagepair` with `endpoint` `api/data` leads to the `sdkmessage` (`Win`). A custom API or
 *    a custom process action has a request of the same name as its message.
 * 2. The message's solutions are the `solutioncomponent` rows that name it: as an SDK message
 *    (component type 201), through its `customapi` (the CustomAPI component type, which differs
 *    between orgs and is read from `solutioncomponentdefinition`), and through the `workflow` of a
 *    custom process action (component type 29, category 3).
 * 3. Only Microsoft-managed solutions are kept: managed, and published by a Microsoft publisher
 *    ({@link MICROSOFT_PUBLISHERS}). Unmanaged solutions (`Default`, `Active`, `Basic` and the
 *    org's own) and ISV solutions name the org, not the product, and are dropped.
 *
 * An operation with no SDK message (the Web API query functions, such as `LastXDays`) is
 * recorded with no solutions (`[]`): it is built into the OData endpoint, so it counts as
 * platform. Two cases are errors, so that no app's operation is counted as platform by accident:
 *
 * - an operation that has an SDK message but whose message (or custom API, or workflow) is in no
 *   solution at all: nothing says which product it belongs to;
 * - an operation that only org-specific solutions name (it is in some solution, but in no
 *   Microsoft-managed one): it was made in the org, and its publisher prefix belongs in
 *   `ORG_SPECIFIC_PREFIXES` so the snapshot leaves it out.
 */

/** Publishers of Microsoft's managed solutions. A managed solution of any other publisher is an ISV's. */
export const MICROSOFT_PUBLISHERS: readonly string[] = [
  "dynamics365customerengagement",
  "DynamicsMKT",
  "MicrosoftCorporation",
  "adxstudio",
  "microsoftdynamics",
  "microsoftdynamicslabs",
  "microsoftfirstparty",
  "microsoftformspro",
  "QMSAnchor",
];

/** Component types of `solutioncomponent` that are fixed in every org. */
export const SDK_MESSAGE_COMPONENT = 201;
export const WORKFLOW_COMPONENT = 29;

/** The rows the solution lookup reads, as the Web API returns them (only the columns it selects). */
export interface SolutionData {
  solutions: Array<{
    solutionid: string;
    uniquename: string;
    ismanaged: boolean;
    publisherid?: { uniquename?: string } | null;
  }>;
  /** `sdkmessagerequest` rows of the `api/data` endpoint, with the message id of their pair. */
  requests: Array<{ name: string; sdkmessageid: string }>;
  customApis: Array<{ customapiid: string; _sdkmessageid_value?: string | null }>;
  /** Custom process actions (`workflow`, category 3). */
  workflows: Array<{ workflowid: string; _sdkmessageid_value?: string | null }>;
  components: Array<{ objectid: string; componenttype: number; _solutionid_value: string }>;
  /** The org's component type for `customapi`. */
  customApiComponentType: number;
}

/** Operation name to the unique names of its Microsoft-managed solutions, both sorted. */
export type OperationSolutions = Record<string, string[]>;

const sortedRecord = <T>(entries: Iterable<[string, T]>): Record<string, T> =>
  Object.fromEntries([...entries].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));

/**
 * The solutions of each of `operations` (Web API operation names), from the rows in `data`.
 * Throws when an operation is only in org-specific solutions.
 */
export function operationSolutionsFrom(
  data: SolutionData,
  operations: Iterable<string>
): OperationSolutions {
  const microsoft = new Set(MICROSOFT_PUBLISHERS);
  const solutions = new Map(data.solutions.map((s) => [s.solutionid, s] as const));
  const isMicrosoft = (id: string): boolean => {
    const s = solutions.get(id);
    return s !== undefined && s.ismanaged && microsoft.has(s.publisherid?.uniquename ?? "");
  };
  const push = <K, V>(map: Map<K, V[]>, key: K, value: V): void => {
    const list = map.get(key);
    if (list) list.push(value);
    else map.set(key, [value]);
  };
  // Request names are case-insensitive in the Web API
  const messages = new Map<string, string[]>();
  for (const r of data.requests) push(messages, r.name.toLowerCase(), r.sdkmessageid);
  const objects = new Map<string, string[]>();
  for (const c of data.customApis) {
    if (c._sdkmessageid_value) {
      push(objects, c._sdkmessageid_value, `${String(data.customApiComponentType)}:${c.customapiid}`);
    }
  }
  for (const w of data.workflows) {
    if (w._sdkmessageid_value) {
      push(objects, w._sdkmessageid_value, `${String(WORKFLOW_COMPONENT)}:${w.workflowid}`);
    }
  }
  const componentSolutions = new Map<string, string[]>();
  for (const c of data.components) {
    push(componentSolutions, `${String(c.componenttype)}:${c.objectid}`, c._solutionid_value);
  }

  const orgOnly: string[] = [];
  const unplaced: string[] = [];
  const result = new Map<string, string[]>();
  for (const op of new Set(operations)) {
    const ids = new Set<string>();
    const opMessages = messages.get(op.toLowerCase()) ?? [];
    for (const message of opMessages) {
      const keys = [`${String(SDK_MESSAGE_COMPONENT)}:${message}`, ...(objects.get(message) ?? [])];
      for (const key of keys) for (const id of componentSolutions.get(key) ?? []) ids.add(id);
    }
    const names = new Set(
      [...ids].filter(isMicrosoft).map((id) => solutions.get(id)?.uniquename ?? "")
    );
    if (opMessages.length > 0 && ids.size === 0) unplaced.push(op);
    if (ids.size > 0 && names.size === 0) orgOnly.push(op);
    result.set(op, [...names].sort());
  }
  if (unplaced.length > 0) {
    throw new Error(
      `snapshot: ${String(unplaced.length)} operation(s) have an SDK message in no solution: ` +
        `${unplaced.sort().join(", ")}. Find out which product they belong to before taking ` +
        "the snapshot: they can't be counted as platform."
    );
  }
  if (orgOnly.length > 0) {
    throw new Error(
      `snapshot: ${String(orgOnly.length)} operation(s) are only in org-specific solutions: ` +
        `${orgOnly.sort().join(", ")}. Add their publisher prefix to ORG_SPECIFIC_PREFIXES.`
    );
  }
  return sortedRecord(result);
}

/** `operation-solutions.json` as it's committed: sorted, two-space indented, ending in a newline. */
export function serializeOperationSolutions(map: OperationSolutions): string {
  return JSON.stringify(sortedRecord(Object.entries(map)), null, 2) + "\n";
}

/** A read-only GET of a Web API collection, following `@odata.nextLink`. */
export type CollectionReader = (path: string) => Promise<Array<Record<string, unknown>>>;

/** Read the rows {@link operationSolutionsFrom} needs. Read-only. */
export async function readSolutionData(read: CollectionReader): Promise<SolutionData> {
  const definitions = await read(
    "solutioncomponentdefinitions?$select=solutioncomponenttype&$filter=primaryentityname eq 'customapi'"
  );
  const customApiComponentType = Number(definitions[0]?.solutioncomponenttype);
  if (!Number.isInteger(customApiComponentType)) {
    throw new Error("snapshot: no solution component type for customapi");
  }
  const solutions = await read(
    "solutions?$select=uniquename,ismanaged&$expand=publisherid($select=uniquename)"
  );
  const requests = await read(
    "sdkmessagerequests?$select=name&$filter=sdkmessagepairid/endpoint eq 'api/data'" +
      "&$expand=sdkmessagepairid($select=_sdkmessageid_value)"
  );
  const customApis = await read("customapis?$select=customapiid,_sdkmessageid_value");
  const workflows = await read(
    "workflows?$select=workflowid,_sdkmessageid_value&$filter=category eq 3"
  );
  const types = [SDK_MESSAGE_COMPONENT, WORKFLOW_COMPONENT, customApiComponentType];
  const components = await read(
    "solutioncomponents?$select=objectid,componenttype,_solutionid_value&$filter=" +
      types.map((t) => `componenttype eq ${String(t)}`).join(" or ")
  );
  return {
    customApiComponentType,
    solutions: solutions as unknown as SolutionData["solutions"],
    requests: requests.flatMap((r) => {
      const pair = r.sdkmessagepairid as { _sdkmessageid_value?: string } | null;
      return pair?._sdkmessageid_value
        ? [{ name: String(r.name), sdkmessageid: pair._sdkmessageid_value }]
        : [];
    }),
    customApis: customApis as unknown as SolutionData["customApis"],
    workflows: workflows as unknown as SolutionData["workflows"],
    components: components as unknown as SolutionData["components"],
  };
}
