/**
 * Every page of the app, grouped as the navigation shows them. Each page is its own chunk,
 * loaded with `React.lazy` the first time it is opened.
 */
import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import type { FluentIcon } from "@fluentui/react-icons";
import {
  bundleIcon,
  BookDatabase20Filled,
  BookDatabase20Regular,
  BookOpen20Filled,
  BookOpen20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  Code20Filled,
  Code20Regular,
  DatabaseSearch20Filled,
  DatabaseSearch20Regular,
  DocumentArrowUp20Filled,
  DocumentArrowUp20Regular,
  ErrorCircle20Filled,
  ErrorCircle20Regular,
  Flash20Filled,
  Flash20Regular,
  Globe20Filled,
  Globe20Regular,
  Home20Filled,
  Home20Regular,
  LockClosed20Filled,
  LockClosed20Regular,
  Options20Filled,
  Options20Regular,
  Organization20Filled,
  Organization20Regular,
  PersonSwap20Filled,
  PersonSwap20Regular,
  Pulse20Filled,
  Pulse20Regular,
  TableEdit20Filled,
  TableEdit20Regular,
} from "@fluentui/react-icons";

// Regular when idle, filled when selected or hovered, as Fluent 2's navigation shows them.
const BookDatabaseIcon = bundleIcon(BookDatabase20Filled, BookDatabase20Regular);
const BookOpenIcon = bundleIcon(BookOpen20Filled, BookOpen20Regular);
const BoxMultipleIcon = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CodeIcon = bundleIcon(Code20Filled, Code20Regular);
const DatabaseSearchIcon = bundleIcon(DatabaseSearch20Filled, DatabaseSearch20Regular);
const DocumentArrowUpIcon = bundleIcon(DocumentArrowUp20Filled, DocumentArrowUp20Regular);
const ErrorCircleIcon = bundleIcon(ErrorCircle20Filled, ErrorCircle20Regular);
const FlashIcon = bundleIcon(Flash20Filled, Flash20Regular);
const GlobeIcon = bundleIcon(Globe20Filled, Globe20Regular);
const HomeIcon = bundleIcon(Home20Filled, Home20Regular);
const LockClosedIcon = bundleIcon(LockClosed20Filled, LockClosed20Regular);
const OptionsIcon = bundleIcon(Options20Filled, Options20Regular);
const OrganizationIcon = bundleIcon(Organization20Filled, Organization20Regular);
const PersonSwapIcon = bundleIcon(PersonSwap20Filled, PersonSwap20Regular);
const PulseIcon = bundleIcon(Pulse20Filled, Pulse20Regular);
const TableEditIcon = bundleIcon(TableEdit20Filled, TableEdit20Regular);

export const NAV_GROUPS = [
  "Overview",
  "Explorer",
  "Data",
  "Operations",
  "Metadata",
  "Files",
  "Environments",
  "Diagnostics",
  "Docs",
] as const;

export type NavGroup = (typeof NAV_GROUPS)[number];

export interface AppRoute {
  path: string;
  title: string;
  group: NavGroup;
  icon: FluentIcon;
  /** One line for the overview page. */
  summary: string;
  component: LazyExoticComponent<ComponentType>;
}

export const ROUTES: AppRoute[] = [
  {
    path: "/",
    title: "Overview",
    group: "Overview",
    icon: HomeIcon,
    summary: "What this app shows, how the client is set up, and a first request.",
    component: lazy(() => import("./pages/HomePage")),
  },
  {
    path: "/explorer",
    title: "Explorer",
    group: "Explorer",
    icon: CodeIcon,
    summary:
      "Any Web API request or typed operation: its SDK code, a preview of the request, and the response.",
    component: lazy(() => import("./pages/ExplorerPage")),
  },
  {
    path: "/data/queries",
    title: "Queries",
    group: "Data",
    icon: DatabaseSearchIcon,
    summary:
      "$select, $filter, $expand with options, paging with iterate(), FetchXML and saved views.",
    component: lazy(() => import("./pages/QueriesPage")),
  },
  {
    path: "/data/crud",
    title: "Create, read, update, delete",
    group: "Data",
    icon: TableEditIcon,
    summary: "One account through createAndGetId(), get(), patch() and delete().",
    component: lazy(() => import("./pages/CrudPage")),
  },
  {
    path: "/data/concurrency",
    title: "Optimistic concurrency",
    group: "Data",
    icon: LockClosedIcon,
    summary: "ifMatch(etag), the 412 for a stale update, and read-modify-write.",
    component: lazy(() => import("./pages/ConcurrencyPage")),
  },
  {
    path: "/data/impersonation",
    title: "Impersonation",
    group: "Data",
    icon: PersonSwapIcon,
    summary: "impersonateByObjectId(): run requests as another user.",
    component: lazy(() => import("./pages/ImpersonationPage")),
  },
  {
    path: "/data/prefer",
    title: "Prefer headers",
    group: "Data",
    icon: OptionsIcon,
    summary: "prefer(): return=representation, annotations and page size.",
    component: lazy(() => import("./pages/PreferPage")),
  },
  {
    path: "/operations/batch",
    title: "$batch",
    group: "Operations",
    icon: BoxMultipleIcon,
    summary: "Change sets, continueOnError and automatic splitting with BatchRequestBuilder.",
    component: lazy(() => import("./pages/BatchPage")),
  },
  {
    path: "/operations/xrm",
    title: "OrganizationService",
    group: "Operations",
    icon: OrganizationIcon,
    summary: "The C# SDK's IOrganizationService shape from @mohsinonxrm/dataverse-sdk-xrm.",
    component: lazy(() => import("./pages/XrmPage")),
  },
  {
    path: "/operations/messages",
    title: "Actions, functions and messages",
    group: "Operations",
    icon: FlashIcon,
    summary: "RetrieveTotalRecordCount, InitializeFrom, CanManyToMany and OrganizationRequest.",
    component: lazy(() => import("./pages/OperationsPage")),
  },
  {
    path: "/metadata",
    title: "Metadata browser",
    group: "Metadata",
    icon: BookDatabaseIcon,
    summary: "Tables, then their columns, with typed attribute casts.",
    component: lazy(() => import("./pages/MetadataPage")),
  },
  {
    path: "/files",
    title: "Files and images",
    group: "Files",
    icon: DocumentArrowUpIcon,
    summary: "Upload in blocks with progress, download and delete with FileColumnClient.",
    component: lazy(() => import("./pages/FilesPage")),
  },
  {
    path: "/environments",
    title: "Environments",
    group: "Environments",
    icon: GlobeIcon,
    summary: "DiscoveryClient: list environments by region, test one and switch to it.",
    component: lazy(() => import("./pages/DiscoveryPage")),
  },
  {
    path: "/diagnostics/telemetry",
    title: "Telemetry and logging",
    group: "Diagnostics",
    icon: PulseIcon,
    summary: "The logger, telemetry and retry hooks, in a live log.",
    component: lazy(() => import("./pages/TelemetryPage")),
  },
  {
    path: "/diagnostics/errors",
    title: "Error handling",
    group: "Diagnostics",
    icon: ErrorCircleIcon,
    summary: "Typed errors for OData failures, throttling, $batch, network failures and aborts.",
    component: lazy(() => import("./pages/ErrorsPage")),
  },
  {
    // Not "/docs": the documentation site is served there, next to the app
    path: "/documentation",
    title: "Documentation",
    group: "Docs",
    icon: BookOpenIcon,
    summary: "Getting started, the guides and the API reference, on the documentation site.",
    component: lazy(() => import("./pages/DocsPage")),
  },
];
