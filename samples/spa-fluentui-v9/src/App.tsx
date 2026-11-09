import { lazy, Suspense } from "react";
import { makeStyles, Spinner } from "@fluentui/react-components";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SdkProvider } from "./sdk/SdkProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

// The sign-in page, the environment picker and the signed-in shell are separate chunks: a visitor
// downloads the ones they reach.
const SignInPage = lazy(() => import("./shell/SignInPage"));
const EnvironmentPicker = lazy(() => import("./shell/EnvironmentPicker"));
const AppShell = lazy(() => import("./shell/AppShell"));

const useStyles = makeStyles({
  loading: { margin: "auto" },
});

function SignedInGate() {
  const styles = useStyles();
  const { state, chooseEnvironment } = useAuth();
  let page;
  if (state.status !== "signedIn") {
    page = <SignInPage />;
  } else if (!state.environmentUrl || state.switching) {
    // Signed in without an environment, or switching: pick one of the user's environments.
    page = <EnvironmentPicker session={state.session} current={state.environmentUrl} />;
  } else {
    page = (
      <SdkProvider
        session={state.session}
        environmentUrl={state.environmentUrl}
        onEnvironmentChange={chooseEnvironment}
      >
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </SdkProvider>
    );
  }
  return (
    <Suspense fallback={<Spinner className={styles.loading} label="Loading…" />}>{page}</Suspense>
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
