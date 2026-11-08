/**
 * The explorer's model: an operation from the generated packages (as the catalog describes it),
 * a raw Web API request, and what the visitor typed for either.
 */

/** The three generated operation packages. */
export type OperationKind = "actions" | "functions" | "messages";

export const OPERATION_KINDS: readonly OperationKind[] = ["actions", "functions", "messages"];

/** The npm package of each kind. */
export const PACKAGE_OF: Record<OperationKind, string> = {
  actions: "@mohsinonxrm/dataverse-sdk-actions",
  functions: "@mohsinonxrm/dataverse-sdk-functions",
  messages: "@mohsinonxrm/dataverse-sdk-messages",
};

/** A property of an operation's parameters object, by its CSDL name. */
export interface CatalogParameter {
  name: string;
  /** The TypeScript type the package declares, e.g. `string[]` or `EntityReference`. */
  type: string;
  /** It can be left out (the CSDL declares it nullable). */
  optional: boolean;
}

/**
 * One operation class of the actions, functions or messages package, read from the package
 * source at build time (`src/explorer/catalog/parse.ts`, run by the Vite plugin in
 * `vite.config.ts`).
 */
export interface CatalogOperation {
  kind: OperationKind;
  /** The CSDL name, or an overload stem such as `AddItemCampaign_list`. */
  name: string;
  /** The exported class, e.g. `WinOpportunityAction` or `WinOpportunityRequest`. */
  className: string;
  method: "GET" | "POST";
  /** The route after the Web API root, e.g. `/teams({teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`. */
  route: string;
  /** Constructor arguments before the parameters object: a bound operation's record id or entity set. */
  args: Array<{ name: string; type: string }>;
  /** The parameters object's properties, or `undefined` when the operation takes none. */
  parameters?: CatalogParameter[];
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const HTTP_METHODS: readonly HttpMethod[] = ["GET", "POST", "PATCH", "PUT", "DELETE"];

/** A raw Web API request as the visitor typed it in the request bar. */
export interface RawRequestInput {
  method: HttpMethod;
  /** Relative to the Web API root (`accounts?$top=3`), or an absolute URL of the environment. */
  url: string;
  /** One `Name: value` per line. */
  headers: string;
  /** JSON, sent for POST, PATCH and PUT. */
  body: string;
}

/** What the visitor typed for an operation: its constructor arguments and parameters, as text. */
export interface OperationInput {
  args: Record<string, string>;
  parameters: Record<string, string>;
}

/** How the SDK code for a typed operation is written. */
export type CodeFlavour = "typed" | "service" | "fluent";
