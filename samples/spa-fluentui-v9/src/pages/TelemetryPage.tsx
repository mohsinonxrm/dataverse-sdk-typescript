import { useState } from "react";
import {
  Badge,
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  mergeClasses,
  Subtitle1,
  Switch,
  Tab,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  tokens,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { CodeBlock } from "../components/CodeBlock";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import { generateActivity } from "../scenarios/telemetry";
import source from "../scenarios/telemetry.ts?raw";
import { activity, useActivity, type ActivityEntry, type ActivitySource } from "../sdk/activity";
import sdkSource from "../sdk/createSdk.ts?raw";
import { useCommonStyles } from "../theme/styles";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  spacer: { flex: 1 },
  log: {
    maxHeight: "28rem",
    overflow: "auto",
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  table: { minWidth: "40rem", tableLayout: "fixed" },
  narrow: { width: "7rem" },
  level: { width: "5rem" },
  time: {
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    color: tokens.colorNeutralForeground3,
  },
  message: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    overflowWrap: "anywhere",
  },
});

const LEVEL_COLOR = {
  debug: "subtle",
  info: "informative",
  warn: "warning",
  error: "danger",
} as const;
type Filter = "all" | ActivitySource;

function LogPanel() {
  const styles = useStyles();
  const common = useCommonStyles();
  const entries = useActivity();
  const [filter, setFilter] = useState<Filter>("all");
  const [debug, setDebug] = useState(true);
  const shown: ActivityEntry[] = entries
    .filter((e) => (filter === "all" || e.source === filter) && (debug || e.level !== "debug"))
    .slice(-200)
    .reverse();

  return (
    <Card size="large" role="region" aria-labelledby="log-heading">
      <CardHeader
        header={
          <Subtitle1 as="h2" id="log-heading">
            Live log
          </Subtitle1>
        }
        description={
          <Body1>
            What every client in this app reports through its hooks, newest first. Run scenarios on
            any page and come back.
          </Body1>
        }
      />
      <div className={styles.toolbar}>
        <TabList
          selectedValue={filter}
          onTabSelect={(_, d) => setFilter(d.value as Filter)}
          size="small"
          aria-label="Source"
        >
          <Tab value="all">All</Tab>
          <Tab value="logger">logger</Tab>
          <Tab value="telemetry">telemetry</Tab>
          <Tab value="retry">retry.onRetry</Tab>
        </TabList>
        <Switch label="Debug messages" checked={debug} onChange={(_, d) => setDebug(d.checked)} />
        <span className={styles.spacer} />
        <Button
          icon={<DeleteRegular />}
          onClick={() => activity.clear()}
          disabled={!entries.length}
        >
          Clear
        </Button>
      </div>
      {shown.length ? (
        <div
          className={mergeClasses(styles.log, common.focusableRegion)}
          role="log"
          aria-label="Activity"
          tabIndex={0}
        >
          <Table size="extra-small" className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell className={styles.narrow}>Time</TableHeaderCell>
                <TableHeaderCell className={styles.narrow}>Source</TableHeaderCell>
                <TableHeaderCell className={styles.level}>Level</TableHeaderCell>
                <TableHeaderCell>Message</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shown.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className={styles.time}>{e.time.toLocaleTimeString()}</TableCell>
                  <TableCell>{e.source}</TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={LEVEL_COLOR[e.level]} shape="rounded">
                      {e.level}
                    </Badge>
                  </TableCell>
                  <TableCell className={styles.message}>{e.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Caption1 className={common.muted}>
          Nothing logged yet. Run the scenario above, or any other.
        </Caption1>
      )}
    </Card>
  );
}

export default function TelemetryPage() {
  return (
    <ScenarioPage
      title="Telemetry and logging"
      description="DataverseClient reports through hooks you pass in: logger (request logs, nothing by default), telemetry (a dependency per attempt and exceptions) and retry.onRetry. Here they all feed the live log below. URLs are redacted unless you ask for full URLs."
    >
      <Card size="large" role="region" aria-labelledby="hooks-heading">
        <CardHeader
          header={
            <Subtitle1 as="h2" id="hooks-heading">
              The hooks
            </Subtitle1>
          }
          description={
            <Body1>
              The logger and telemetry client every scenario&apos;s client is created with.
            </Body1>
          }
        />
        <CodeBlock code={snippet(sdkSource, "hooks")} label="Hooks code" />
      </Card>
      <Scenario
        title="Generate activity"
        description="A request that is retried once after a 503, a query, and a request that fails: each one shows up in the log."
        code={snippet(source, "generate-activity")}
        run={(sdk, signal) => generateActivity(sdk, signal)}
      />
      <LogPanel />
    </ScenarioPage>
  );
}
