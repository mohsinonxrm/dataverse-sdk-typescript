import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  CompoundButton,
  Divider,
  Field,
  Input,
  Link,
  makeStyles,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  SearchBox,
  Spinner,
  Subtitle1,
  Title2,
  ToggleButton,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowClockwiseRegular,
  ArrowLeftRegular,
  Database20Regular,
  GlobeRegular,
  SignOutRegular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import type { DiscoveredEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import {
  canChoose,
  discoverEnvironments,
  filterEnvironments,
  FILTER_THRESHOLD,
  hostOf,
} from "../auth/environments";
import { readLastEnvironment } from "../auth/lastEnvironment";
import type { AuthSession } from "../auth/session";
import { ErrorCard } from "../components/ErrorCard";
import {
  adminConsentUrl,
  APP_NAME,
  normalizeUrl,
  readConnectionSettings,
  validateEnvironmentUrl,
} from "../config";
import { useThemeMode } from "../theme/ThemeProvider";

const useStyles = makeStyles({
  root: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: "border-box",
    ":focus-visible": { outline: "none" },
  },
  card: {
    width: "100%",
    maxWidth: "42rem",
    padding: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalL,
    "@media (max-width: 47.99em)": { padding: tokens.spacingHorizontalL },
  },
  brand: { color: tokens.colorBrandForeground1 },
  title: { margin: 0, color: tokens.colorNeutralForeground1 },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalM,
  },
  urlField: { alignSelf: "stretch" },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
    maxHeight: "24rem",
    overflowY: "auto",
  },
  option: {
    width: "100%",
    maxWidth: "none",
    justifyContent: "flex-start",
    textAlign: "start",
  },
  muted: { color: tokens.colorNeutralForeground3 },
  actions: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalS },
  theme: { position: "absolute", top: tokens.spacingVerticalM, right: tokens.spacingHorizontalM },
});

type Discovery =
  | { status: "loading" }
  | { status: "loaded"; environments: DiscoveredEnvironment[] }
  | { status: "failed"; error: unknown };

/** What an environment's button says under its name: host, region, version and state. */
function details(e: DiscoveredEnvironment, lastUsed?: string, current?: string): string {
  const url = normalizeUrl(e.url).toLowerCase();
  return [
    hostOf(e.url),
    e.region,
    e.version ? `version ${e.version}` : undefined,
    e.enabled ? undefined : "disabled",
    url === current?.toLowerCase() ? "in use" : url === lastUsed?.toLowerCase() ? "last used" : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * After sign-in without an environment URL, or from the header's "Switch environment": the
 * environments the Global Discovery Service lists for the signed-in user, or a URL typed in.
 */
export default function EnvironmentPicker({
  session,
  current,
}: {
  session: AuthSession;
  /** The environment in use when switching; the picker can go back to it. */
  current?: string;
}) {
  const styles = useStyles();
  const { chooseEnvironment, cancelSwitch, signOut } = useAuth();
  const { mode, toggle } = useThemeMode();
  const main = useRef<HTMLElement>(null);
  const lastUsed = useMemo(() => readLastEnvironment(session.accountId), [session]);
  const [discovery, setDiscovery] = useState<Discovery>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const urlError = submitted ? validateEnvironmentUrl(url) : undefined;

  useEffect(() => {
    document.title = `Choose an environment · ${APP_NAME}`;
    // Coming from the app's header, focus starts on the page rather than nowhere.
    if (current) main.current?.focus();
  }, [current]);

  useEffect(() => {
    const controller = new AbortController();
    setDiscovery({ status: "loading" });
    discoverEnvironments(session, { lastUsed, signal: controller.signal }).then(
      (environments) => {
        if (!controller.signal.aborted) setDiscovery({ status: "loaded", environments });
      },
      (error: unknown) => {
        if (!controller.signal.aborted) setDiscovery({ status: "failed", error });
      }
    );
    return () => controller.abort();
  }, [session, lastUsed, attempt]);

  const environments = discovery.status === "loaded" ? discovery.environments : [];
  const shown = filterEnvironments(environments, query);

  const submitUrl = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (validateEnvironmentUrl(url) === undefined) chooseEnvironment(normalizeUrl(url));
  };

  const settings = session.mode === "msal" ? readConnectionSettings() : undefined;
  const hint = (
    <Caption1 className={styles.muted}>
      The Global Discovery Service lists the environments where your account has a Dataverse license
      and a security role. If one is missing, ask an admin for a license or a role in it.
      {settings?.clientId && (
        <>
          {" "}
          If your organization lets only admins consent to apps, an admin can{" "}
          <Link href={adminConsentUrl(settings)} target="_blank" rel="noreferrer">
            grant admin consent for this app
          </Link>{" "}
          once for everyone.
        </>
      )}
    </Caption1>
  );

  return (
    <main ref={main} tabIndex={-1} className={styles.root}>
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
              Choose an environment
            </Title2>
          }
        />
        <Body1>
          Signed in as {session.user.name} ({session.user.username}). Pick the Dataverse environment
          to explore; you can switch later from the account menu.
        </Body1>

        <section className={styles.section} aria-labelledby="environments-heading">
          <Subtitle1 as="h2" id="environments-heading">
            Your environments
          </Subtitle1>
          {discovery.status === "loading" && <Spinner label="Finding your environments…" />}
          {discovery.status === "failed" && (
            <>
              <ErrorCard error={discovery.error} />
              {hint}
              <div className={styles.actions}>
                <Button icon={<ArrowClockwiseRegular />} onClick={() => setAttempt((n) => n + 1)}>
                  Try again
                </Button>
              </div>
            </>
          )}
          {discovery.status === "loaded" && environments.length === 0 && (
            <>
              <MessageBar intent="info" layout="multiline">
                <MessageBarBody>
                  <MessageBarTitle>No environments found</MessageBarTitle>
                  The Global Discovery Service lists no environment for {session.user.username}.
                </MessageBarBody>
              </MessageBar>
              {hint}
            </>
          )}
          {environments.length > 0 && (
            <>
              {environments.length > FILTER_THRESHOLD && (
                <Field label="Filter environments">
                  <SearchBox
                    value={query}
                    onChange={(_, d) => setQuery(d.value)}
                    placeholder="Name, URL or region"
                  />
                </Field>
              )}
              <Caption1 role="status" className={styles.muted}>
                {shown.length === environments.length
                  ? `${environments.length} environment${environments.length === 1 ? "" : "s"}`
                  : `${shown.length} of ${environments.length} environments match`}
              </Caption1>
              <ul className={styles.list} aria-labelledby="environments-heading">
                {shown.map((e) => (
                  <li key={e.id}>
                    <CompoundButton
                      className={styles.option}
                      appearance={
                        normalizeUrl(e.url).toLowerCase() === current?.toLowerCase()
                          ? "primary"
                          : "secondary"
                      }
                      icon={<GlobeRegular />}
                      secondaryContent={details(e, lastUsed, current)}
                      disabled={!canChoose(e)}
                      onClick={() => chooseEnvironment(e.url)}
                    >
                      {e.name}
                    </CompoundButton>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <Divider />
        <section className={styles.section} aria-labelledby="url-heading">
          <Subtitle1 as="h2" id="url-heading">
            Or enter its URL
          </Subtitle1>
          <form
            className={styles.form}
            onSubmit={submitUrl}
            aria-labelledby="url-heading"
            noValidate
          >
            <Field
              className={styles.urlField}
              label="Environment URL"
              validationMessage={urlError}
              hint={urlError ? undefined : "For example https://contoso.crm.dynamics.com"}
            >
              <Input
                type="url"
                value={url}
                onChange={(_, d) => setUrl(d.value)}
                autoComplete="url"
              />
            </Field>
            <Button type="submit" appearance="primary">
              Continue
            </Button>
          </form>
        </section>

        <Divider />
        <div className={styles.actions}>
          {current && (
            <Button icon={<ArrowLeftRegular />} onClick={cancelSwitch}>
              {`Back to ${hostOf(current)}`}
            </Button>
          )}
          <Button appearance="subtle" icon={<SignOutRegular />} onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </Card>
    </main>
  );
}
