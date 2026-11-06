import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  createMsalBrowserProvider,
  type MsalBrowserTokenProvider,
} from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { OrganizationService } from "@mohsinonxrm/dataverse-sdk-xrm";
import { loginRequest } from "../config";

/**
 * Dataverse Context Value
 *
 * Provides SDK instances to all components in the application.
 * Initialized once with MSAL authentication and shared across the app.
 */
interface DataverseContextValue {
  client: DataverseClient | null;
  /** The MSAL-backed token provider; pass it to SDK clients that need their own token (e.g. discovery). */
  tokenProvider: MsalBrowserTokenProvider | null;
  orgService: OrganizationService | null;
  baseUrl: string;
  apiVersion: string;
  isReady: boolean;
}

const DataverseContext = createContext<DataverseContextValue | null>(null);

interface DataverseProviderProps {
  children: ReactNode;
  baseUrl: string;
}

/**
 * DataverseProvider Component
 *
 * Wraps the application and provides Dataverse SDK instances via React Context.
 * Automatically initializes SDK clients with MSAL authentication.
 *
 * @example
 * ```tsx
 * <DataverseProvider baseUrl="https://yourorg.crm.dynamics.com">
 *   <App />
 * </DataverseProvider>
 * ```
 */
export function DataverseProvider({ children, baseUrl }: DataverseProviderProps) {
  const { instance, accounts } = useMsal();
  const [contextValue, setContextValue] = useState<DataverseContextValue>({
    client: null,
    tokenProvider: null,
    orgService: null,
    baseUrl,
    apiVersion: "v9.2",
    isReady: false,
  });

  useEffect(() => {
    // Only initialize if user is authenticated
    if (accounts.length === 0) {
      setContextValue((prev) => ({ ...prev, isReady: false }));
      return;
    }

    try {
      // Create token provider
      const tokenProvider = createMsalBrowserProvider(instance, {
        account: accounts[0],
        scopes: loginRequest.scopes,
      });

      // Create Dataverse client
      const client = new DataverseClient({
        baseUrl,
        apiVersion: "v9.2",
        tokenProvider,
      });

      // Create OrganizationService
      const orgService = new OrganizationService(client);

      setContextValue({
        client,
        tokenProvider,
        orgService,
        baseUrl,
        apiVersion: "v9.2",
        isReady: true,
      });
    } catch (error) {
      console.error("Failed to initialize Dataverse SDK:", error);
      setContextValue((prev) => ({ ...prev, isReady: false }));
    }
  }, [instance, accounts, baseUrl]);

  return <DataverseContext.Provider value={contextValue}>{children}</DataverseContext.Provider>;
}

/**
 * useDataverse Hook
 *
 * Access Dataverse SDK instances from any component.
 * Must be used within a DataverseProvider.
 *
 * @throws Error if used outside DataverseProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { client, orgService, isReady } = useDataverse();
 *
 *   if (!isReady) {
 *     return <Spinner label="Initializing SDK..." />;
 *   }
 *
 *   // Use client or orgService
 *   const accounts = await client.api('/accounts').top(10).get();
 * }
 * ```
 */
export function useDataverse(): DataverseContextValue {
  const context = useContext(DataverseContext);

  if (!context) {
    throw new Error("useDataverse must be used within a DataverseProvider");
  }

  return context;
}
