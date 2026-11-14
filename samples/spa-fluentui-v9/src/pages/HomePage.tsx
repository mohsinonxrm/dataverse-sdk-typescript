import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  Subtitle1,
  Subtitle2,
  tokens,
} from "@fluentui/react-components";
import { CodeBlock } from "../components/CodeBlock";
import { RouterLink } from "../components/RouterLink";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import { NAV_GROUPS, ROUTES } from "../routes";
import { whoAmI } from "../scenarios/basics";
import basicsSource from "../scenarios/basics.ts?raw";
import { useSdkContext } from "../sdk/SdkProvider";
import sdkSource from "../sdk/createSdk.ts?raw";
import { useCommonStyles } from "../theme/styles";

const useStyles = makeStyles({
  groups: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))",
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalL,
  },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  list: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  summary: { display: "block", color: tokens.colorNeutralForeground3 },
});

export default function HomePage() {
  const styles = useStyles();
  const common = useCommonStyles();
  const { session } = useSdkContext();
  return (
    <ScenarioPage
      title="Overview"
      description={
        <>
          Each page runs real calls of the{" "}
          <span className={common.mono}>@mohsinonxrm/dataverse-sdk</span> packages, shows the exact
          code it runs, and lists every request it sent with its status and timing.{" "}
          {session.mode === "demo"
            ? "You are in demo mode: the SDK talks to an in-browser copy of a small environment, so you can change and delete freely."
            : "You are signed in to your own environment: write scenarios create, change and delete records there."}
        </>
      }
    >
      <section aria-labelledby="scenarios-heading" className={styles.section}>
        <Subtitle1 as="h2" id="scenarios-heading">
          Scenarios
        </Subtitle1>
        <div className={styles.groups}>
          {NAV_GROUPS.filter((g) => g !== "Overview").map((group) => {
            const routes = ROUTES.filter((r) => r.group === group);
            if (!routes.length) return null;
            return (
              <Card key={group} size="large">
                <CardHeader header={<Subtitle2 as="h3">{group}</Subtitle2>} />
                <ul className={styles.list}>
                  {routes.map((r) => (
                    <li key={r.path}>
                      <RouterLink to={r.path}>{r.title}</RouterLink>
                      <Caption1 className={styles.summary}>{r.summary}</Caption1>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      <Scenario
        title="Who am I?"
        description="The first request most apps send. The same call through the request builder and through a typed function class."
        code={snippet(basicsSource, "who-am-i")}
        run={(sdk, signal) => whoAmI(sdk, signal)}
      />

      <Card size="large" role="region" aria-labelledby="client-setup-heading">
        <CardHeader
          header={
            <Subtitle1 as="h2" id="client-setup-heading">
              How the client is set up
            </Subtitle1>
          }
          description={
            <Body1>
              Every scenario gets a <span className={common.mono}>DataverseClient</span> made like
              this: the session&apos;s token provider, a logger and telemetry client that feed the
              Telemetry page, a retry hook, and the request inspector appended to the pipeline.
            </Body1>
          }
        />
        <CodeBlock code={snippet(sdkSource, "client-setup")} label="Client setup code" />
      </Card>
    </ScenarioPage>
  );
}
