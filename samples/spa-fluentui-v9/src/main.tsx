import React from "react";
import ReactDOM from "react-dom/client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { FluentProvider } from "@fluentui/react-components";
import { msalConfig } from "./config";
import { useTheme } from "./hooks/useTheme";
import App from "./App";
import "./index.css";

// Initialize MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Handle redirect promise
msalInstance.initialize().then(() => {
  // This is critical! Handle the redirect response after coming back from Azure AD
  msalInstance
    .handleRedirectPromise()
    .then((response) => {
      if (response) {
        // Login was successful, set the active account
        msalInstance.setActiveAccount(response.account);
        console.log("Login successful:", response.account);
      } else {
        // Not a redirect scenario, check if there are existing accounts
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          msalInstance.setActiveAccount(accounts[0]);
        }
      }
    })
    .catch((error) => {
      console.error("Error handling redirect:", error);
    });

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as any;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
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
