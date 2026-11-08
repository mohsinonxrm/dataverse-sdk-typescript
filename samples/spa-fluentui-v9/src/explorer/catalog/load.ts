/**
 * The operation catalogs and packages, each loaded the first time it's needed and kept.
 * The import specifiers are literal so Vite can split each into its own chunk.
 */
import type { OperationPackage } from "../operations";
import type { CatalogOperation, OperationKind } from "../types";

const catalogs: Record<OperationKind, () => Promise<{ default: CatalogOperation[] }>> = {
  actions: () => import("virtual:operation-catalog/actions"),
  functions: () => import("virtual:operation-catalog/functions"),
  messages: () => import("virtual:operation-catalog/messages"),
};

const packages: Record<OperationKind, () => Promise<OperationPackage>> = {
  actions: () => import("virtual:explorer-package/actions"),
  functions: () => import("virtual:explorer-package/functions"),
  messages: () => import("virtual:explorer-package/messages"),
};

const loadedCatalogs = new Map<OperationKind, Promise<CatalogOperation[]>>();
const loadedPackages = new Map<OperationKind, Promise<OperationPackage>>();

/** The operations of one package. */
export function loadCatalog(kind: OperationKind): Promise<CatalogOperation[]> {
  let loaded = loadedCatalogs.get(kind);
  if (!loaded) {
    loaded = catalogs[kind]().then((m) => m.default);
    // A failed load (offline) can be retried.
    void loaded.catch(() => loadedCatalogs.delete(kind));
    loadedCatalogs.set(kind, loaded);
  }
  return loaded;
}

/** The package itself, to build and run its operations. */
export function loadPackage(kind: OperationKind): Promise<OperationPackage> {
  let loaded = loadedPackages.get(kind);
  if (!loaded) {
    loaded = packages[kind]();
    void loaded.catch(() => loadedPackages.delete(kind));
    loadedPackages.set(kind, loaded);
  }
  return loaded;
}
