/**
 * The SDK's documentation, which lives in the repository: the site links to it rather than
 * copying it, so there is one copy to keep up to date. The site deploys from `main`, the branch
 * of the current stable release, so the links point there too.
 */
import { REPO_URL } from "./config";

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

const doc = (path: string) => `${REPO_URL}/blob/main/${path}`;

/** The published packages with an API Extractor report (`packages/<pkg>/etc/<pkg>.api.md`). */
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
    href: doc("docs/getting-started.md"),
    summary: "Install the packages, authenticate, and run your first queries and writes.",
    section: "Guides",
    onSignIn: true,
  },
  {
    title: "Using the SDK in the browser",
    href: doc("docs/browser.md"),
    summary: "App registration, MSAL, CORS and Content-Security-Policy for single-page apps.",
    section: "Guides",
  },
  {
    title: "Usage patterns",
    href: doc("docs/SDK-USAGE-PATTERNS.md"),
    summary: "Queries, paging, concurrency, impersonation, $batch and error handling.",
    section: "Guides",
  },
  {
    title: "Migrating to 2.0",
    href: doc("docs/migration-2.0.md"),
    summary: "What changed in 2.0 and how to update your code.",
    section: "Guides",
    onSignIn: true,
  },
  {
    title: "Samples",
    href: doc("docs/samples/README.md"),
    summary: "Node, daemon and browser samples, including this site's source.",
    section: "Guides",
  },
  {
    title: "Supported operations",
    href: doc("docs/mapping/supported-operations.md"),
    summary: "Every typed action, function and message, and the Web API route it calls.",
    section: "Operations",
  },
  {
    title: "Actions",
    href: doc("docs/mapping/supported-actions.md"),
    summary: "@mohsinonxrm/dataverse-sdk-actions: POST operations, bulk operations, files.",
    section: "Operations",
  },
  {
    title: "Functions",
    href: doc("docs/mapping/supported-functions.md"),
    summary: "@mohsinonxrm/dataverse-sdk-functions: GET operations, with parameter aliases.",
    section: "Operations",
  },
  {
    title: "Messages",
    href: doc("docs/mapping/supported-messages.md"),
    summary: "@mohsinonxrm/dataverse-sdk-messages: OrganizationRequest and its responses.",
    section: "Operations",
  },
  {
    title: "Messages and the Web API",
    href: doc("docs/mapping/message-to-webapi.md"),
    summary: "How an Organization Service message maps to a Web API request.",
    section: "Operations",
  },
  ...API_REPORTS.map(([pkg, summary]): DocLink => ({
    title: `@mohsinonxrm/dataverse-sdk-${pkg}`,
    href: doc(`packages/dataverse-sdk-${pkg}/etc/dataverse-sdk-${pkg}.api.md`),
    summary,
    section: "API reference",
    onSignIn: pkg === "core",
    signInTitle: pkg === "core" ? "API reference" : undefined,
  })),
];
