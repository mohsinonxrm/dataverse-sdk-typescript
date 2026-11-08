/**
 * Every page of the app, grouped as the navigation shows them. Each page is its own chunk,
 * loaded with `React.lazy` the first time it is opened.
 */
import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import type { FluentIcon } from "@fluentui/react-icons";
import {
  BookDatabase20Regular,
  BookOpen20Regular,
  BoxMultiple20Regular,
  Code20Regular,
  DatabaseSearch20Regular,
  DocumentArrowUp20Regular,
  ErrorCircle20Regular,
  Flash20Regular,
  Globe20Regular,
  Home20Regular,
  LockClosed20Regular,
  Options20Regular,
  Organization20Regular,
  PersonSwap20Regular,
  Pulse20Regular,
  TableEdit20Regular,
} from "@fluentui/react-icons";

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
    icon: Home20Regular,
    summary: "What this app shows, how the client is set up, and a first request.",
    component: lazy(() => import("./pages/HomePage")),
  },
  {
    path: "/explorer",
    title: "Explorer",
    group: "Explorer",
    icon: Code20Regular,
    summary:
      "Any Web API request or typed operation: its SDK code, a preview of the request, and the response.",
    component: lazy(() => import("./pages/ExplorerPage")),
  },
  {
    path: "/data/queries",
    title: "Queries",
    group: "Data",
    icon: DatabaseSearch20Regular,
    summary:
      "$select, $filter, $expand with options, paging with iterate(), FetchXML and saved views.",
    component: lazy(() => import("./pages/QueriesPage")),
  },
  {
    path: "/data/crud",
    title: "Create, read, update, delete",
    group: "Data",
    icon: TableEdit20Regular,
    summary: "One account through createAndGetId(), get(), patch() and delete().",
    component: lazy(() => import("./pages/CrudPage")),
  },
  {
    path: "/data/concurrency",
    title: "Optimistic concurrency",
    group: "Data",
    icon: LockClosed20Regular,
    summary: "ifMatch(etag), the 412 for a stale update, and read-modify-write.",
    component: lazy(() => import("./pages/ConcurrencyPage")),
  },
  {
    path: "/data/impersonation",
    title: "Impersonation",
    group: "Data",
    icon: PersonSwap20Regular,
    summary: "impersonateByObjectId(): run requests as another user.",
    component: lazy(() => import("./pages/ImpersonationPage")),
  },
  {
    path: "/data/prefer",
    title: "Prefer headers",
    group: "Data",
    icon: Options20Regular,
    summary: "prefer(): return=representation, annotations and page size.",
    component: lazy(() => import("./pages/PreferPage")),
  },
  {
    path: "/operations/batch",
    title: "$batch",
    group: "Operations",
    icon: BoxMultiple20Regular,
    summary: "Change sets, continueOnError and automatic splitting with BatchRequestBuilder.",
    component: lazy(() => import("./pages/BatchPage")),
  },
  {
    path: "/operations/xrm",
    title: "OrganizationService",
    group: "Operations",
    icon: Organization20Regular,
    summary: "The C# SDK's IOrganizationService shape from @mohsinonxrm/dataverse-sdk-xrm.",
    component: lazy(() => import("./pages/XrmPage")),
  },
  {
    path: "/operations/messages",
    title: "Actions, functions and messages",
    group: "Operations",
    icon: Flash20Regular,
    summary: "RetrieveTotalRecordCount, InitializeFrom, CanManyToMany and OrganizationRequest.",
    component: lazy(() => import("./pages/OperationsPage")),
  },
  {
    path: "/metadata",
    title: "Metadata browser",
    group: "Metadata",
    icon: BookDatabase20Regular,
    summary: "Tables, then their columns, with typed attribute casts.",
    component: lazy(() => import("./pages/MetadataPage")),
  },
  {
    path: "/files",
    title: "Files and images",
    group: "Files",
    icon: DocumentArrowUp20Regular,
    summary: "Upload in blocks with progress, download and delete with FileColumnClient.",
    component: lazy(() => import("./pages/FilesPage")),
  },
  {
    path: "/environments",
    title: "Environments",
    group: "Environments",
    icon: Globe20Regular,
    summary: "DiscoveryClient: list environments by region, test one and switch to it.",
    component: lazy(() => import("./pages/DiscoveryPage")),
  },
  {
    path: "/diagnostics/telemetry",
    title: "Telemetry and logging",
    group: "Diagnostics",
    icon: Pulse20Regular,
    summary: "The logger, telemetry and retry hooks, in a live log.",
    component: lazy(() => import("./pages/TelemetryPage")),
  },
  {
    path: "/diagnostics/errors",
    title: "Error handling",
    group: "Diagnostics",
    icon: ErrorCircle20Regular,
    summary: "Typed errors for OData failures, throttling, $batch, network failures and aborts.",
    component: lazy(() => import("./pages/ErrorsPage")),
  },
  {
    path: "/docs",
    title: "Documentation",
    group: "Docs",
    icon: BookOpen20Regular,
    summary: "Getting started, the guides and the API reference, on GitHub.",
    component: lazy(() => import("./pages/DocsPage")),
  },
];
