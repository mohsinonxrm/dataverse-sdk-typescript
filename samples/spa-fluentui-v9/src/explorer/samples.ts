/**
 * The explorer's sample queries, grouped by area. Each one runs in demo mode (the unit tests run
 * them all against it) and in a real environment.
 */
import type {
  CodeFlavour,
  HttpMethod,
  OperationInput,
  OperationKind,
  RawRequestInput,
} from "./types";

export const SAMPLE_GROUPS = [
  "Queries",
  "Create, update, delete",
  "Concurrency",
  "Impersonation",
  "Metadata",
  "Functions",
  "Actions",
  "Messages and OrganizationService",
  "Errors",
] as const;

export type SampleGroup = (typeof SAMPLE_GROUPS)[number];

interface SampleBase {
  /** Stable id, used in `?sample=` links. */
  id: string;
  group: SampleGroup;
  title: string;
  /** The run fails on purpose (to show the SDK's typed error). */
  failsOnPurpose?: boolean;
}

export interface RawSample extends SampleBase {
  type: "raw";
  request: RawRequestInput;
}

export interface OperationSample extends SampleBase {
  type: "operation";
  operation: { kind: OperationKind; name: string };
  input: OperationInput;
  flavour?: CodeFlavour;
}

export type Sample = RawSample | OperationSample;

const raw = (
  id: string,
  group: SampleGroup,
  title: string,
  method: HttpMethod,
  url: string,
  extra: { headers?: string; body?: unknown; failsOnPurpose?: boolean } = {}
): RawSample => ({
  id,
  group,
  title,
  type: "raw",
  failsOnPurpose: extra.failsOnPurpose,
  request: {
    method,
    url,
    headers: extra.headers ?? "",
    body: extra.body === undefined ? "" : JSON.stringify(extra.body, null, 2),
  },
});

const op = (
  id: string,
  group: SampleGroup,
  title: string,
  kind: OperationKind,
  name: string,
  parameters: Record<string, string> = {},
  flavour?: CodeFlavour
): OperationSample => ({
  id,
  group,
  title,
  type: "operation",
  operation: { kind, name },
  input: { args: {}, parameters },
  flavour,
});

export const SAMPLES: Sample[] = [
  raw("top-accounts", "Queries", "Top 3 accounts", "GET", "accounts?$select=name,accountid&$top=3"),
  raw(
    "filter-order-count",
    "Queries",
    "Filter, order and count",
    "GET",
    "accounts?$select=name,address1_city&$filter=statecode eq 0&$orderby=name asc&$count=true&$top=5"
  ),
  raw(
    "expand-lookup",
    "Queries",
    "Expand the primary contact",
    "GET",
    "accounts?$select=name&$expand=primarycontactid($select=fullname,emailaddress1)&$top=3"
  ),
  raw(
    "formatted-values",
    "Queries",
    "Formatted values",
    "GET",
    "accounts?$select=name,revenue&$top=3",
    { headers: 'Prefer: odata.include-annotations="OData.Community.Display.V1.FormattedValue"' }
  ),
  raw(
    "page-size",
    "Queries",
    "Page size with Prefer",
    "GET",
    "contacts?$select=fullname&$orderby=fullname asc",
    { headers: "Prefer: odata.maxpagesize=5" }
  ),
  raw(
    "aggregate",
    "Queries",
    "Group and count with $apply",
    "GET",
    "accounts?$apply=groupby((address1_city),aggregate($count as count))"
  ),
  raw(
    "create-account",
    "Create, update, delete",
    "Create an account, return it",
    "POST",
    "accounts?$select=name,accountid",
    {
      headers: "Prefer: return=representation",
      body: { name: "Created in the explorer", telephone1: "+1 425 555 0100" },
    }
  ),
  raw("whoami-raw", "Impersonation", "WhoAmI", "GET", "WhoAmI"),
  raw("impersonate", "Impersonation", "WhoAmI as another user", "GET", "WhoAmI", {
    headers: "CallerObjectId: 2c4e6a8b-1d3f-4b5c-8e7a-9f0b1c2d3e4f",
  }),
  raw(
    "update-missing",
    "Concurrency",
    "Update only if it exists (If-Match: *)",
    "PATCH",
    "accounts(00000000-0000-0000-0000-000000000001)",
    { headers: "If-Match: *", body: { name: "Never created" }, failsOnPurpose: true }
  ),
  raw(
    "tables",
    "Metadata",
    "Tables",
    "GET",
    "EntityDefinitions?$select=LogicalName,EntitySetName,PrimaryIdAttribute"
  ),
  raw(
    "account-columns",
    "Metadata",
    "Columns of account",
    "GET",
    "EntityDefinitions(LogicalName='account')/Attributes?$select=LogicalName,AttributeType"
  ),
  op("whoami", "Functions", "WhoAmI", "functions", "WhoAmI"),
  op("version", "Functions", "RetrieveVersion", "functions", "RetrieveVersion"),
  op(
    "record-counts",
    "Functions",
    "RetrieveTotalRecordCount",
    "functions",
    "RetrieveTotalRecordCount",
    {
      EntityNames: '["account", "contact"]',
    }
  ),
  op("can-many-to-many", "Actions", "CanManyToMany", "actions", "CanManyToMany", {
    EntityName: "account",
  }),
  op(
    "can-be-referenced",
    "Messages and OrganizationService",
    "CanBeReferenced through OrganizationService",
    "messages",
    "CanBeReferenced",
    { EntityName: "account" },
    "service"
  ),
  op(
    "can-be-referencing",
    "Messages and OrganizationService",
    "CanBeReferencing",
    "messages",
    "CanBeReferencing",
    { EntityName: "contact" },
    "typed"
  ),
  raw(
    "not-found",
    "Errors",
    "A record that doesn't exist (404)",
    "GET",
    "accounts(00000000-0000-0000-0000-000000000000)",
    {
      failsOnPurpose: true,
    }
  ),
  raw(
    "bad-query",
    "Errors",
    "A query Dataverse refuses (400)",
    "GET",
    "accounts?$select=nosuchcolumn",
    {
      failsOnPurpose: true,
    }
  ),
];

/** The badge of a sample: its HTTP method. */
export function sampleMethod(sample: Sample): HttpMethod {
  if (sample.type === "raw") return sample.request.method;
  return sample.operation.kind === "functions" ? "GET" : "POST";
}
