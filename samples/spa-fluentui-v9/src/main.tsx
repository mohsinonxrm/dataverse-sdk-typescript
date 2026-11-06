import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType, type AuthenticationResult } from "@azure/msal-browser";
import { initializeMsal } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { FluentProvider } from "@fluentui/react-components";
import { msalConfig } from "./config";
import { useTheme } from "./hooks/useTheme";
import App from "./App";
import "./index.css";

// Initialize MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// initializeMsal() initializes MSAL, completes a pending redirect sign-in and sets the active account.
initializeMsal(msalInstance)
  .catch((error: unknown) => {
    console.error("Error handling redirect:", error);
  })
  .then(() => {
    msalInstance.addEventCallback((event) => {
      const payload = event.payload as AuthenticationResult | null;
      if (event.eventType === EventType.LOGIN_SUCCESS && payload?.account) {
        msalInstance.setActiveAccount(payload.account);
      }
    });

    // Render app
    function Root() {
      const { theme } = useTheme();

      return (
        <MsalProvider instance={msalInstance}>
          <FluentProvider theme={theme}>
            <App />
          </FluentProvider>
        </MsalProvider>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>
    );
  });
