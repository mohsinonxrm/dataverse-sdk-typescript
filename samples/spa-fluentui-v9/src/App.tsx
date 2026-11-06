import { lazy, Suspense } from "react";
import { makeStyles, Spinner } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SdkProvider } from "./sdk/SdkProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

// The sign-in page and the signed-in shell are separate chunks: a visitor downloads one of them.
const SignInPage = lazy(() => import("./shell/SignInPage"));
const AppShell = lazy(() => import("./shell/AppShell"));

const useStyles = makeStyles({
  loading: { margin: "auto" },
});

function SignedInGate() {
  const styles = useStyles();
  const { state } = useAuth();
  return (
    <Suspense fallback={<Spinner className={styles.loading} label="Loading…" />}>
      {state.status !== "signedIn" ? (
        <SignInPage />
      ) : (
        <SdkProvider session={state.session}>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </SdkProvider>
      )}
    </Suspense>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary title="The app failed to start.">
        <AuthProvider>
          <SignedInGate />
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
