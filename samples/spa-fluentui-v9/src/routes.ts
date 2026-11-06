/**
 * Every page of the app, grouped as the navigation shows them. Each page is its own chunk,
 * loaded with `React.lazy` the first time it is opened.
 */
import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import type { FluentIcon } from "@fluentui/react-icons";
import { ErrorCircle20Regular, Home20Regular } from "@fluentui/react-icons";

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
    path: "/diagnostics/errors",
    title: "Error handling",
    group: "Diagnostics",
    icon: ErrorCircle20Regular,
    summary: "Typed errors for OData failures, throttling, $batch, network failures and aborts.",
    component: lazy(() => import("./pages/ErrorsPage")),
  },
];
