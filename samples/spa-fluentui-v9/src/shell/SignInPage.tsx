import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  Divider,
  Field,
  Input,
  Link,
  makeStyles,
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
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { ErrorCard } from "../components/ErrorCard";
import {
  adminConsentUrl,
  APP_NAME,
  normalizeUrl,
  readConnectionSettings,
  redirectUri,
  REPO_URL,
  validateSettings,
  type ConnectionSettings,
} from "../config";
import { DOC_LINKS } from "../docs";
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
    maxWidth: "38rem",
    padding: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalL,
    "@media (max-width: 47.99em)": { padding: tokens.spacingHorizontalL },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  title: { margin: 0, color: tokens.colorNeutralForeground1 },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  form: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  muted: { color: tokens.colorNeutralForeground3 },
  code: { fontFamily: tokens.fontFamilyMonospace, overflowWrap: "anywhere" },
  links: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalXS,
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
  },
  theme: { position: "absolute", top: tokens.spacingVerticalM, right: tokens.spacingHorizontalM },
});

/**
 * Shown while nobody is signed in: the demo (no sign-in), and Microsoft sign-in to the visitor's
 * own environment with their own app registration. Nothing here is a secret: the environment URL,
 * client id and tenant are kept in localStorage for the next visit.
 */
export default function SignInPage() {
  const styles = useStyles();
  const { state, signIn, startDemo } = useAuth();
  const { mode, toggle } = useThemeMode();
  const [settings, setSettings] = useState<ConnectionSettings>(readConnectionSettings);
  const [submitted, setSubmitted] = useState(false);
  const loading = state.status === "loading";
  const error = state.status === "signedOut" ? state.error : undefined;
  const errors = validateSettings(settings);
  const shown = submitted ? errors : {};

  useEffect(() => {
    document.title = `Sign in · ${APP_NAME}`;
  }, []);

  const set = (name: keyof ConnectionSettings) => (_: unknown, data: { value: string }) =>
    setSettings((s) => ({ ...s, [name]: data.value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;
    void signIn({
      environmentUrl: normalizeUrl(settings.environmentUrl),
      clientId: settings.clientId.trim(),
      tenantId: settings.tenantId.trim() || "organizations",
    });
  };

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
              {APP_NAME}
            </Title2>
          }
        />
        <Body1>
          Try the <span className={styles.code}>@mohsinonxrm/dataverse-sdk</span> packages in your
          browser: build a Web API request or pick one of more than 2,300 typed actions, functions
          and messages, see the SDK code for it, run it and inspect the request and response.
        </Body1>
        {loading ? (
          <Spinner label="Checking your sign-in…" />
        ) : (
          <>
            <section className={styles.section} aria-labelledby="demo-heading">
              <Subtitle1 as="h2" id="demo-heading">
                Try it without signing in
              </Subtitle1>
              <Button
                appearance="primary"
                size="large"
                icon={<PlayRegular />}
                onClick={() => void startDemo()}
              >
                Explore with demo data
              </Button>
              <Caption1 className={styles.muted}>
                Demo mode runs the real SDK against an in-browser copy of a small Dataverse
                environment. Nothing leaves your browser.
              </Caption1>
            </section>
            <Divider />
            <section className={styles.section} aria-labelledby="org-heading">
              <Subtitle1 as="h2" id="org-heading">
                Use your own environment
              </Subtitle1>
              <Caption1 className={styles.muted}>
                You need an app registration in Microsoft Entra ID: platform &quot;Single-page
                application&quot; with the redirect URI{" "}
                <span className={styles.code}>{redirectUri()}</span>, and the delegated permission{" "}
                <span className={styles.code}>Dynamics CRM / user_impersonation</span>. Requests go
                straight from your browser to your environment; there is no server in between.
              </Caption1>
              <form
                className={styles.form}
                onSubmit={submit}
                aria-label="Your environment"
                noValidate
              >
                <Field
                  label="Environment URL"
                  required
                  validationMessage={shown.environmentUrl}
                  hint={
                    shown.environmentUrl
                      ? undefined
                      : "For example https://contoso.crm.dynamics.com"
                  }
                >
                  <Input
                    type="url"
                    value={settings.environmentUrl}
                    onChange={set("environmentUrl")}
                    autoComplete="url"
                  />
                </Field>
                <Field label="Application (client) ID" required validationMessage={shown.clientId}>
                  <Input
                    value={settings.clientId}
                    onChange={set("clientId")}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </Field>
                <Field
                  label="Tenant"
                  validationMessage={shown.tenantId}
                  hint={
                    shown.tenantId
                      ? undefined
                      : "A tenant id or domain; organizations for any work or school account."
                  }
                >
                  <Input value={settings.tenantId} onChange={set("tenantId")} spellCheck={false} />
                </Field>
                <Button type="submit" size="large" icon={<PersonRegular />}>
                  Sign in with Microsoft
                </Button>
              </form>
              {!errors.clientId && (
                <Caption1 className={styles.muted}>
                  Some organizations let only an admin consent to an app&apos;s permissions. If
                  sign-in asks for admin approval, an admin can{" "}
                  <Link href={adminConsentUrl(settings)} target="_blank" rel="noreferrer">
                    grant admin consent for this app
                  </Link>{" "}
                  once for everyone.
                </Caption1>
              )}
            </section>
          </>
        )}
        {error !== undefined && <ErrorCard error={error} />}
        <Divider />
        <nav aria-label="Documentation">
          <ul className={styles.links}>
            {DOC_LINKS.filter((d) => d.onSignIn).map((d) => (
              <li key={d.href}>
                <Link href={d.href} target="_blank" rel="noreferrer">
                  {d.signInTitle ?? d.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={REPO_URL} target="_blank" rel="noreferrer">
                Source on GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </Card>
    </main>
  );
}
