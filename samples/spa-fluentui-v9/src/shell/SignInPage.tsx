import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Spinner,
  Subtitle1,
  Title2,
  ToggleButton,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  Database20Regular,
  PersonRegular,
  PlayRegular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useEffect } from "react";
import { useAuth } from "../auth/AuthProvider";
import { ErrorCard } from "../components/ErrorCard";
import { isMsalConfigured, settings } from "../config";
import { useThemeMode } from "../theme/ThemeProvider";

const useStyles = makeStyles({
  root: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "34rem",
    padding: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalL,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  title: { margin: 0, color: tokens.colorNeutralForeground1 },
  actions: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  muted: { color: tokens.colorNeutralForeground3 },
  code: { fontFamily: tokens.fontFamilyMonospace },
  theme: { position: "absolute", top: tokens.spacingVerticalM, right: tokens.spacingHorizontalM },
});

/** Shown while nobody is signed in: Microsoft sign-in when configured, and the demo mode. */
export default function SignInPage() {
  const styles = useStyles();
  const { state, signIn, startDemo } = useAuth();
  const { mode, toggle } = useThemeMode();
  const loading = state.status === "loading";
  const error = state.status === "signedOut" ? state.error : undefined;

  useEffect(() => {
    document.title = "Sign in · Dataverse SDK showcase";
  }, []);

  return (
    <main className={styles.root}>
      <Tooltip
        content={mode === "dark" ? "Use the light theme" : "Use the dark theme"}
        relationship="description"
      >
        <ToggleButton
          className={styles.theme}
          appearance="subtle"
          checked={mode === "dark"}
          onClick={toggle}
          aria-label="Dark theme"
          icon={mode === "dark" ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />}
        />
      </Tooltip>
      <Card className={styles.card}>
        <CardHeader
          image={<Database20Regular className={styles.brand} aria-hidden />}
          header={
            <Title2 as="h1" className={styles.title}>
              Dataverse SDK showcase
            </Title2>
          }
        />
        <Body1>
          A Fluent 2 app that runs the{" "}
          <span className={styles.code}>@mohsinonxrm/dataverse-sdk</span> packages in the browser:
          queries, writes, <span className={styles.code}>$batch</span>, metadata, files, discovery
          and more, each with the code it runs and the requests it sends.
        </Body1>
        {loading ? (
          <Spinner label="Checking your sign-in…" />
        ) : (
          <div className={styles.actions}>
            <Subtitle1 as="h2">Choose how to start</Subtitle1>
            <Button
              appearance="primary"
              size="large"
              icon={<PersonRegular />}
              disabled={!isMsalConfigured}
              onClick={() => void signIn()}
            >
              Sign in with Microsoft
            </Button>
            {isMsalConfigured ? (
              <Caption1 className={styles.muted}>
                Connects to {new URL(settings.environmentUrl).host}.
              </Caption1>
            ) : (
              <MessageBar intent="info" layout="multiline">
                <MessageBarBody>
                  <MessageBarTitle>Sign-in isn&apos;t configured</MessageBarTitle>
                  Set <span className={styles.code}>VITE_AZURE_CLIENT_ID</span> and{" "}
                  <span className={styles.code}>VITE_DATAVERSE_URL</span> in{" "}
                  <span className={styles.code}>.env</span> to use your own environment. The demo
                  works without them.
                </MessageBarBody>
              </MessageBar>
            )}
            <Button
              size="large"
              appearance={isMsalConfigured ? "secondary" : "primary"}
              icon={<PlayRegular />}
              onClick={() => void startDemo()}
            >
              Explore with demo data
            </Button>
            <Caption1 className={styles.muted}>
              Demo mode runs the real SDK against an in-browser copy of a small Dataverse
              environment. Nothing leaves your browser.
            </Caption1>
          </div>
        )}
        {error !== undefined && <ErrorCard error={error} />}
      </Card>
    </main>
  );
}
