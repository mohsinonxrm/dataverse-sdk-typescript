/**
 * Every page of the app, grouped as the navigation shows them. Each page is its own chunk,
 * loaded with `React.lazy` the first time it is opened.
 */
import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import type { FluentIcon } from "@fluentui/react-icons";
import {
  BoxMultiple20Regular,
  DatabaseSearch20Regular,
  ErrorCircle20Regular,
  Home20Regular,
  LockClosed20Regular,
  Options20Regular,
  Organization20Regular,
  PersonSwap20Regular,
  TableEdit20Regular,
} from "@fluentui/react-icons";

export const NAV_GROUPS = [
  "Overview",
  "Data",
  "Operations",
  "Metadata",
  "Files",
  "Environments",
  "Diagnostics",
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
    path: "/diagnostics/errors",
    title: "Error handling",
    group: "Diagnostics",
    icon: ErrorCircle20Regular,
    summary: "Typed errors for OData failures, throttling, $batch, network failures and aborts.",
    component: lazy(() => import("./pages/ErrorsPage")),
  },
];
