import { useState } from "react";
import {
  makeStyles,
  tokens,
  Title3,
  Text,
  Card,
  Button,
  Tab,
  TabList,
  Badge,
} from "@fluentui/react-components";
import {
  ArrowClockwiseRegular,
  GaugeRegular,
  EyeTrackingRegular,
  FlashRegular,
} from "@fluentui/react-icons";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";

import { CodeComparison } from "../../components/demo/CodeComparison";
import type { ResultView } from "../../types/common";

const useStyles = makeStyles({
  container: {
    padding: "32px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "24px",
  },
  description: {
    color: tokens.colorNeutralForeground2,
    marginTop: "8px",
  },
  tabs: {
    marginTop: "24px",
    marginBottom: "24px",
  },
  content: {
    marginTop: "24px",
  },
  card: {
    padding: "24px",
    marginBottom: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  logEntry: {
    padding: "12px",
    marginTop: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: "12px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  statCard: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    textAlign: "center",
  },
});

type TabValue = "retry" | "throttling" | "concurrency" | "telemetry";

interface LogEntry {
  timestamp: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
}

interface ConcurrencyStats {
  total: number;
  completed: number;
  concurrent: number;
  adaptiveLimit: number;
}

export default function Observability() {
  const styles = useStyles();
  const { isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("retry");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<ResultView | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<ConcurrencyStats | null>(null);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const addLog = (type: LogEntry["type"], message: string) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
    };
    setLogs((prev) => [entry, ...prev].slice(0, 20)); // Keep last 20
  };

  const handleRetryDemo = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);
    let attempts = 0;
    let lastError: unknown = null;

    try {
      addLog("info", "Starting retry demonstration...");

      // Simulate an operation that might fail
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        attempts++;
        addLog("info", `Attempt ${attempts}/${maxAttempts}...`);

        try {
          // Simulate random failure
          if (Math.random() > 0.5 && attempts < maxAttempts) {
            throw new Error("Simulated transient error (502 Bad Gateway)");
          }

          // Success
          addLog("success", `Request succeeded on attempt ${attempts}`);
          setResults({
            demo: "Retry Logic",
            totalAttempts: attempts,
            status: "Success",
          });
          break;
        } catch (err) {
          lastError = err;
          addLog(
            "warning",
            `Attempt ${attempts} failed: ${err instanceof Error ? err.message : String(err)}`
          );

          if (attempts < maxAttempts) {
            const backoffMs = Math.min(1000 * Math.pow(2, attempts - 1), 30000);
            addLog("info", `Waiting ${backoffMs}ms before retry (exponential backoff)...`);
            await new Promise((resolve) => setTimeout(resolve, backoffMs));
          }
        }
      }

      if (attempts >= maxAttempts && lastError) {
        throw new Error(`Max retry attempts (${maxAttempts}) exceeded`);
      }
    } catch (err) {
      setError(err as Error);
      addLog("error", `Operation failed after ${attempts} attempts`);
    } finally {
      setLoading(false);
    }
  };

  const handleThrottlingDemo = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);

    try {
      addLog("info", "Simulating API throttling (429 Too Many Requests)...");

      // Simulate 429 response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addLog("warning", "Received 429 Too Many Requests");
      addLog("info", "Retry-After header: 60 seconds");
      addLog("info", "x-ms-ratelimit-burst-remaining-xrm-requests: 0");
      addLog("info", "x-ms-ratelimit-time-remaining-xrm-requests: 300000ms");

      // Simulate waiting
      addLog("info", "Honoring Retry-After, waiting 60 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Shortened for demo

      addLog("success", "Retry succeeded after throttle period");

      setResults({
        demo: "Throttling Awareness",
        status: "Recovered from 429",
        retryAfter: "60 seconds",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleConcurrencyDemo = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);

    try {
      addLog("info", "Demonstrating adaptive concurrency control...");
      addLog("info", "Initial concurrency limit: 10 requests");

      const totalRequests = 50;
      setStats({
        total: totalRequests,
        completed: 0,
        concurrent: 10,
        adaptiveLimit: 10,
      });

      // Simulate processing requests with adaptive concurrency
      for (let i = 1; i <= totalRequests; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Simulate x-ms-dop-hint header from server
        if (i === 15) {
          addLog("info", "Received x-ms-dop-hint: 5 (server suggests reducing concurrency)");
          setStats((prev) => prev && { ...prev, adaptiveLimit: 5, concurrent: 5 });
        } else if (i === 35) {
          addLog("info", "Received x-ms-dop-hint: 15 (server allows more concurrency)");
          setStats((prev) => prev && { ...prev, adaptiveLimit: 15, concurrent: 15 });
        }

        setStats((prev) => prev && { ...prev, completed: i });
      }

      addLog("success", `Completed ${totalRequests} requests with adaptive concurrency`);

      setResults({
        demo: "Adaptive Concurrency",
        totalRequests,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleTelemetryDemo = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);

    try {
      addLog("info", "Telemetry middleware capturing request metrics...");

      // Simulate telemetry capture
      await new Promise((resolve) => setTimeout(resolve, 500));
      addLog("info", "Request started: GET /accounts");
      addLog("info", "Adding custom headers: x-ms-client-request-id, x-ms-client-session-id");

      await new Promise((resolve) => setTimeout(resolve, 800));
      addLog("success", "Request completed: 200 OK (842ms)");
      addLog("info", "Telemetry sent to Application Insights");

      const telemetryData = {
        operationName: "DataverseRequest",
        duration: 842,
        success: true,
        properties: {
          method: "GET",
          url: "/accounts",
          statusCode: 200,
          clientRequestId: "abc-123-def",
        },
        measurements: {
          "response-time-ms": 842,
          "request-size-bytes": 256,
          "response-size-bytes": 4096,
        },
      };

      addLog("info", `Telemetry data: ${JSON.stringify(telemetryData, null, 2)}`);

      setResults({
        demo: "Telemetry Integration",
        telemetryData,
        status: "Captured",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderRetryTab = () => (
    <div>
      <Card className={styles.card}>
        <Title3>Automatic Retry Logic</Title3>
        <Text>
          The SDK automatically retries failed requests with exponential backoff for transient
          errors (429, 502, 503, 504)
        </Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<ArrowClockwiseRegular />}
            onClick={handleRetryDemo}
            disabled={loading}
          >
            Run Retry Demo
          </Button>
        </div>
      </Card>

      {logs.length > 0 && (
        <Card className={styles.card}>
          <Title3>Request Log</Title3>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>
              <Badge
                appearance="filled"
                color={
                  log.type === "success"
                    ? "success"
                    : log.type === "error"
                      ? "danger"
                      : log.type === "warning"
                        ? "warning"
                        : "informative"
                }
                style={{ marginRight: "8px" }}
              >
                {log.type.toUpperCase()}
              </Badge>
              <Text size={200}>
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </Text>
            </div>
          ))}
        </Card>
      )}
    </div>
  );

  const renderThrottlingTab = () => (
    <div>
      <Card className={styles.card}>
        <Title3>Throttling Awareness</Title3>
        <Text>
          The SDK honors Retry-After headers and monitors rate limit headers to avoid throttling
        </Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<FlashRegular />}
            onClick={handleThrottlingDemo}
            disabled={loading}
          >
            Simulate Throttling
          </Button>
        </div>
      </Card>

      {logs.length > 0 && (
        <Card className={styles.card}>
          <Title3>Throttling Log</Title3>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>
              <Badge
                appearance="filled"
                color={
                  log.type === "success"
                    ? "success"
                    : log.type === "error"
                      ? "danger"
                      : log.type === "warning"
                        ? "warning"
                        : "informative"
                }
                style={{ marginRight: "8px" }}
              >
                {log.type.toUpperCase()}
              </Badge>
              <Text size={200}>
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </Text>
            </div>
          ))}
        </Card>
      )}
    </div>
  );

  const renderConcurrencyTab = () => (
    <div>
      <Card className={styles.card}>
        <Title3>Adaptive Concurrency Control</Title3>
        <Text>
          The SDK adjusts concurrency based on x-ms-dop-hint headers from the server for optimal
          performance
        </Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<GaugeRegular />}
            onClick={handleConcurrencyDemo}
            disabled={loading}
          >
            Run Concurrency Demo
          </Button>
        </div>

        {stats && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <Text weight="semibold" size={500}>
                {stats.completed}
              </Text>
              <Text size={200}>Completed</Text>
            </div>
            <div className={styles.statCard}>
              <Text weight="semibold" size={500}>
                {stats.total}
              </Text>
              <Text size={200}>Total</Text>
            </div>
            <div className={styles.statCard}>
              <Text weight="semibold" size={500}>
                {stats.concurrent}
              </Text>
              <Text size={200}>Current</Text>
            </div>
            <div className={styles.statCard}>
              <Text weight="semibold" size={500}>
                {stats.adaptiveLimit}
              </Text>
              <Text size={200}>Limit</Text>
            </div>
          </div>
        )}
      </Card>

      {logs.length > 0 && (
        <Card className={styles.card}>
          <Title3>Concurrency Log</Title3>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>
              <Badge
                appearance="filled"
                color={log.type === "success" ? "success" : "informative"}
                style={{ marginRight: "8px" }}
              >
                {log.type.toUpperCase()}
              </Badge>
              <Text size={200}>
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </Text>
            </div>
          ))}
        </Card>
      )}
    </div>
  );

  const renderTelemetryTab = () => (
    <div>
      <Card className={styles.card}>
        <Title3>Telemetry Integration</Title3>
        <Text>
          The SDK integrates with Application Insights and OpenTelemetry for comprehensive
          observability
        </Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<EyeTrackingRegular />}
            onClick={handleTelemetryDemo}
            disabled={loading}
          >
            Capture Telemetry
          </Button>
        </div>
      </Card>

      {logs.length > 0 && (
        <Card className={styles.card}>
          <Title3>Telemetry Log</Title3>
          {logs.map((log, i) => (
            <div key={i} className={styles.logEntry}>
              <Badge
                appearance="filled"
                color={log.type === "success" ? "success" : "informative"}
                style={{ marginRight: "8px" }}
              >
                {log.type.toUpperCase()}
              </Badge>
              <Text size={200}>
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </Text>
            </div>
          ))}
        </Card>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Observability & Resiliency</Title3>
        <Text className={styles.description}>
          Built-in retry logic, throttling awareness, adaptive concurrency, and telemetry
          integration
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as TabValue)}
        className={styles.tabs}
      >
        <Tab value="retry" icon={<ArrowClockwiseRegular />}>
          Retry Logic
        </Tab>
        <Tab value="throttling" icon={<FlashRegular />}>
          Throttling
        </Tab>
        <Tab value="concurrency" icon={<GaugeRegular />}>
          Concurrency
        </Tab>
        <Tab value="telemetry" icon={<EyeTrackingRegular />}>
          Telemetry
        </Tab>
      </TabList>

      <div className={styles.content}>
        {loading && <LoadingState label="Running demonstration..." />}
        {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

        {!loading && selectedTab === "retry" && renderRetryTab()}
        {!loading && selectedTab === "throttling" && renderThrottlingTab()}
        {!loading && selectedTab === "concurrency" && renderConcurrencyTab()}
        {!loading && selectedTab === "telemetry" && renderTelemetryTab()}
      </div>

      {results && (
        <CodeComparison
          items={[
            {
              label: "Results",
              code: "",
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );
}
