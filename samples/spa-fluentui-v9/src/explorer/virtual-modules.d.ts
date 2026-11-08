// The explorer's lazily loaded modules, served by the `explorer-modules` plugin in vite.config.ts.

declare module "virtual:operation-catalog/actions" {
  const operations: import("./types").CatalogOperation[];
  export default operations;
}
declare module "virtual:operation-catalog/functions" {
  const operations: import("./types").CatalogOperation[];
  export default operations;
}
declare module "virtual:operation-catalog/messages" {
  const operations: import("./types").CatalogOperation[];
  export default operations;
}

declare module "virtual:explorer-package/actions" {
  export * from "@mohsinonxrm/dataverse-sdk-actions";
}
declare module "virtual:explorer-package/functions" {
  export * from "@mohsinonxrm/dataverse-sdk-functions";
}
declare module "virtual:explorer-package/messages" {
  export * from "@mohsinonxrm/dataverse-sdk-messages";
}
