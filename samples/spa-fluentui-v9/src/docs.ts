/**
 * The SDK's documentation: pages of the documentation site (`apps/docs`, built from the repo's
 * `docs/` and package READMEs), which deploys with this app from `main`, the current stable
 * release. The routes are the site's (`apps/docs/pages.mjs`).
 */
import { DOCS_URL } from "./config";

export type DocSection = "Guides" | "Operations" | "API reference";

export interface DocLink {
  title: string;
  href: string;
  summary: string;
  section: DocSection;
  /** Also linked from the sign-in page. */
  onSignIn?: boolean;
  /** The link text on the sign-in page, when it differs. */
  signInTitle?: string;
}

/** A page of the documentation site, e.g. `guide/getting-started`. */
const page = (route: string) => `${DOCS_URL}/${route}`;

/** Packages with a page in the documentation site's API reference (TypeDoc). */
const API_REPORTS: Array<[string, string]> = [
  ["core", "DataverseClient, the request builder, errors, middleware and paging"],
  ["auth-msal-browser", "MSAL sign-in for single-page apps"],
  ["auth-msal-node", "MSAL for Node: device code, client credentials"],
  ["auth-azure-identity", "Any @azure/identity credential"],
  ["batch", "$batch requests and change sets"],
  ["metadata", "Tables, columns, relationships and choices"],
  ["files", "File and image columns, uploaded in blocks"],
  ["discovery", "The Global Discovery Service"],
  ["xrm", "OrganizationService, the C# SDK's shape"],
  ["entities-runtime", "EntityReference and the entity helpers"],
  ["appinsights", "Application Insights telemetry"],
  ["otel", "OpenTelemetry tracing"],
  ["generator", "Typed entities and operations for your own tables and custom APIs"],
];

export const DOC_LINKS: DocLink[] = [
  {
    title: "Getting started",
    href: page("guide/getting-started"),
    summary: "Install the packages, authenticate, and run your first queries and writes.",
    section: "Guides",
    onSignIn: true,
  },
  {
    title: "Using the SDK in the browser",
    href: page("guide/browser"),
    summary: "App registration, MSAL, CORS and Content-Security-Policy for single-page apps.",
    section: "Guides",
  },
  {
    title: "Usage patterns",
    href: page("guide/usage-patterns"),
    summary: "Queries, paging, concurrency, impersonation, $batch and error handling.",
    section: "Guides",
  },
  {
    title: "Migrating to 2.0",
    href: page("guide/migration-2.0"),
    summary: "What changed in 2.0 and how to update your code.",
    section: "Guides",
    onSignIn: true,
  },
  {
    title: "Samples",
    href: page("guide/samples"),
    summary: "Node, daemon and browser samples, including this site's source.",
    section: "Guides",
  },
  {
    title: "Supported operations",
    href: page("guide/mapping/supported-operations"),
    summary: "Every typed action, function and message, and the Web API route it calls.",
    section: "Operations",
  },
  {
    title: "Actions",
    href: page("guide/mapping/supported-actions"),
    summary: "@mohsinonxrm/dataverse-sdk-actions: POST operations, bulk operations, files.",
    section: "Operations",
  },
  {
    title: "Functions",
    href: page("guide/mapping/supported-functions"),
    summary: "@mohsinonxrm/dataverse-sdk-functions: GET operations, with parameter aliases.",
    section: "Operations",
  },
  {
    title: "Messages",
    href: page("guide/mapping/supported-messages"),
    summary: "@mohsinonxrm/dataverse-sdk-messages: OrganizationRequest and its responses.",
    section: "Operations",
  },
  {
    title: "Messages and the Web API",
    href: page("guide/mapping/message-to-webapi"),
    summary: "How an Organization Service message maps to a Web API request.",
    section: "Operations",
  },
  ...API_REPORTS.map(([pkg, summary]): DocLink => ({
    title: `@mohsinonxrm/dataverse-sdk-${pkg}`,
    href: page(`api/@mohsinonxrm/dataverse-sdk-${pkg}/`),
    summary,
    section: "API reference",
    onSignIn: pkg === "core",
    signInTitle: pkg === "core" ? "API reference" : undefined,
  })),
];
