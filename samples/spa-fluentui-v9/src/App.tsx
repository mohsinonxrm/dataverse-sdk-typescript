import { useIsAuthenticated } from "@azure/msal-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import { DataverseProvider } from "./context/DataverseContext";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AccountList from "./pages/AccountList";
import AccountDetail from "./pages/AccountDetail";
import CreateAccount from "./pages/CreateAccount";

// Scenario pages
import CrudOperations from "./pages/CrudOperations";
import AdvancedQuerying from "./pages/AdvancedQuerying";
import BulkOperations from "./pages/BulkOperations";
import BatchOperations from "./pages/BatchOperations";
import RelationshipOperations from "./pages/RelationshipOperations";
import MetadataExplorer from "./pages/MetadataExplorer";
import FileOperations from "./pages/FileOperations";
import ActionsFunctions from "./pages/ActionsFunctions";
import Messages from "./pages/Messages";
import Discovery from "./pages/Discovery";
import Observability from "./pages/Observability";
import TypeSafety from "./pages/TypeSafety";
import ApiReference from "./pages/ApiReference";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});

function App() {
  const styles = useStyles();
  const isAuthenticated = useIsAuthenticated();

  // Get baseUrl from environment or config
  const baseUrl = import.meta.env.VITE_DATAVERSE_URL || "https://org.crm.dynamics.com";

  return (
    <div className={styles.root}>
      <BrowserRouter>
        <DataverseProvider baseUrl={baseUrl}>
          {isAuthenticated && <Header />}
          <main className={styles.main}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/accounts"
                element={isAuthenticated ? <AccountList /> : <Navigate to="/login" />}
              />
              <Route
                path="/accounts/new"
                element={isAuthenticated ? <CreateAccount /> : <Navigate to="/login" />}
              />
              <Route
                path="/accounts/:id"
                element={isAuthenticated ? <AccountDetail /> : <Navigate to="/login" />}
              />

              {/* Scenario pages */}
              <Route
                path="/scenarios/crud"
                element={isAuthenticated ? <CrudOperations /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/querying"
                element={isAuthenticated ? <AdvancedQuerying /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/bulk"
                element={isAuthenticated ? <BulkOperations /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/batch"
                element={isAuthenticated ? <BatchOperations /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/relationships"
                element={isAuthenticated ? <RelationshipOperations /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/metadata"
                element={isAuthenticated ? <MetadataExplorer /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/files"
                element={isAuthenticated ? <FileOperations /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/actions"
                element={isAuthenticated ? <ActionsFunctions /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/messages"
                element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/discovery"
                element={isAuthenticated ? <Discovery /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/observability"
                element={isAuthenticated ? <Observability /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/typesafety"
                element={isAuthenticated ? <TypeSafety /> : <Navigate to="/login" />}
              />
              <Route
                path="/scenarios/reference"
                element={isAuthenticated ? <ApiReference /> : <Navigate to="/login" />}
              />

              <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
              />
            </Routes>
          </main>
        </DataverseProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
