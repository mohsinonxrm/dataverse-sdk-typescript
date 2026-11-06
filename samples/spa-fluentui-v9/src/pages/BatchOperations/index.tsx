import { useState } from "react";
import { makeStyles, tokens, Title3, Text, Card, Button, Badge } from "@fluentui/react-components";
import { DatabaseRegular, AddRegular, EditRegular, DeleteRegular } from "@fluentui/react-icons";
import {
  BatchRequestBuilder,
  DataverseBatchError,
  type BatchResponseStep,
} from "@mohsinonxrm/dataverse-sdk-batch";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { ProgressTracker } from "../../components/demo/ProgressTracker";
import { CodeComparison } from "../../components/demo/CodeComparison";
import type { ResultView, ProgressState } from "../../types/common";

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
  builder: {
    display: "flex",
    gap: "24px",
    marginTop: "24px",
  },
  requestList: {
    flex: 1,
    padding: "24px",
  },
  visualization: {
    flex: 1,
    padding: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap",
  },
  requestItem: {
    padding: "12px",
    marginBottom: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changesetBox: {
    padding: "16px",
    marginTop: "12px",
    border: `2px dashed ${tokens.colorBrandStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  dependencyGraph: {
    marginTop: "24px",
  },
  graphNode: {
    padding: "12px",
    margin: "8px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    display: "inline-block",
  },
  arrow: {
    display: "inline-block",
    margin: "0 8px",
    color: tokens.colorBrandForeground1,
  },
});

interface BatchRequest {
  id: number;
  method: string;
  url: string;
  body?: unknown;
  inChangeset: boolean;
  contentId?: string;
}

export default function BatchOperations() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();

  const [error, setError] = useState<Error | null>(null);
  const [requests, setRequests] = useState<BatchRequest[]>([]);
  const [nextId, setNextId] = useState(1);
  const [executing, setExecuting] = useState(false);
  const [results, setResults] = useState<ResultView | null>(null);
  const [progress, setProgress] = useState<ProgressState | null>(null);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const addRequest = (method: string, url: string, body?: unknown, inChangeset = false) => {
    const request: BatchRequest = {
      id: nextId,
      method,
      url,
      body,
      inChangeset,
      contentId: inChangeset ? `${nextId}` : undefined,
    };
    setRequests([...requests, request]);
    setNextId(nextId + 1);
  };

  const clearRequests = () => {
    setRequests([]);
    setNextId(1);
    setResults(null);
    setError(null);
  };

  const executeBatch = async () => {
    if (!client || requests.length === 0) return;
    setExecuting(true);
    setError(null);
    setProgress({ total: requests.length, current: 0, successCount: 0, errorCount: 0 });

    const changesetRequests = requests.filter((r) => r.inChangeset);
    const nonChangesetRequests = requests.filter((r) => !r.inChangeset);
    const startTime = Date.now();

    try {
      // BatchRequestBuilder encodes the multipart body and sends it through the client, so the
      // request carries the same authentication, retry and telemetry as every other call.
      const batch = new BatchRequestBuilder(client);

      if (changesetRequests.length > 0) {
        batch.beginChangeset();
        changesetRequests.forEach((req) => {
          batch.addRequest(String(req.id), req.method, req.url, undefined, req.body);
        });
        batch.endChangeset();
      }
      nonChangesetRequests.forEach((req) => {
        batch.addRequest(String(req.id), req.method, req.url, undefined, req.body);
      });

      const result = await batch.execute({ continueOnError: true });
      finishBatch(
        result.successfulRequests,
        result.failedRequests,
        startTime,
        changesetRequests.length,
        Array.from(result.responses.values())
      );
    } catch (err) {
      if (err instanceof DataverseBatchError) {
        finishBatch(
          err.successfulRequests,
          err.failedRequests,
          startTime,
          changesetRequests.length,
          Array.from(err.requestErrors.values())
        );
      }
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setExecuting(false);
    }
  };

  const finishBatch = (
    successCount: number,
    errorCount: number,
    startTime: number,
    changesetCount: number,
    responses: BatchResponseStep[]
  ) => {
    setProgress({ total: requests.length, current: requests.length, successCount, errorCount });
    setResults({
      totalRequests: requests.length,
      successCount,
      errorCount,
      duration: `${((Date.now() - startTime) / 1000).toFixed(2)}s`,
      changesetCount,
      responsePreview: JSON.stringify(
        responses.map((r) => ({ id: r.id, status: r.status })),
        null,
        2
      ),
    });
  };

  const buildSampleBatch = () => {
    clearRequests();
    // Changeset: Create account, then create contact linked to it
    addRequest(
      "POST",
      "/accounts",
      {
        "@odata.type": "Microsoft.Dynamics.CRM.account",
        name: "Contoso Ltd",
        revenue: 5000000,
      },
      true
    );

    addRequest(
      "POST",
      "/contacts",
      {
        "@odata.type": "Microsoft.Dynamics.CRM.contact",
        firstname: "John",
        lastname: "Doe",
        "parentcustomerid_account@odata.bind": "$1", // Reference to Content-ID 1
      },
      true
    );

    // Non-changeset: Read operations
    addRequest("GET", "/accounts?$select=name&$top=5", undefined, false);
    addRequest("GET", "/contacts?$select=fullname&$top=5", undefined, false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Batch Operations</Title3>
        <Text className={styles.description}>
          Execute multiple operations in a single request with changeset support and dependency
          tracking
        </Text>
      </div>

      <div className={styles.builder}>
        <Card className={styles.requestList}>
          <Title3>Batch Request Builder</Title3>
          <Text>Add requests to the batch (max 1000)</Text>

          <div className={styles.actions}>
            <Button
              size="small"
              icon={<AddRegular />}
              onClick={() => addRequest("POST", "/accounts", { name: "New Account" }, true)}
            >
              Add Create
            </Button>
            <Button
              size="small"
              icon={<EditRegular />}
              onClick={() => addRequest("PATCH", "/accounts(guid)", { name: "Updated" }, true)}
            >
              Add Update
            </Button>
            <Button
              size="small"
              icon={<DeleteRegular />}
              onClick={() => addRequest("DELETE", "/accounts(guid)", undefined, true)}
            >
              Add Delete
            </Button>
            <Button
              size="small"
              onClick={() => addRequest("GET", "/accounts?$top=10", undefined, false)}
            >
              Add Read
            </Button>
            <Button appearance="primary" onClick={buildSampleBatch}>
              Build Sample Batch
            </Button>
            <Button onClick={clearRequests}>Clear All</Button>
          </div>

          <div style={{ marginTop: "24px" }}>
            <Text weight="semibold">Requests in Batch: {requests.length} / 1000</Text>
            {requests.map((req) => (
              <div key={req.id} className={styles.requestItem}>
                <div>
                  <Badge
                    appearance="filled"
                    color={
                      req.method === "POST"
                        ? "success"
                        : req.method === "PATCH"
                          ? "warning"
                          : req.method === "DELETE"
                            ? "danger"
                            : "informative"
                    }
                  >
                    {req.method}
                  </Badge>
                  <Text style={{ marginLeft: "8px" }}>{req.url}</Text>
                  {req.inChangeset && (
                    <Badge appearance="outline" color="brand" style={{ marginLeft: "8px" }}>
                      Changeset
                    </Badge>
                  )}
                  {req.contentId && (
                    <Text
                      size={200}
                      style={{ marginLeft: "8px", color: tokens.colorNeutralForeground3 }}
                    >
                      Content-ID: {req.contentId}
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<DatabaseRegular />}
              onClick={executeBatch}
              disabled={executing || requests.length === 0}
            >
              Execute Batch
            </Button>
          </div>
        </Card>

        <Card className={styles.visualization}>
          <Title3>Changeset Visualization</Title3>
          <Text>Requests in changesets are transactional (all or nothing)</Text>

          <div className={styles.changesetBox}>
            <Text weight="semibold">Changeset (Transactional)</Text>
            {requests
              .filter((r) => r.inChangeset)
              .map((req) => (
                <div key={req.id} className={styles.requestItem} style={{ marginTop: "8px" }}>
                  <Badge color="brand">{req.method}</Badge>
                  <Text size={200}>{req.url}</Text>
                </div>
              ))}
            {requests.filter((r) => r.inChangeset).length === 0 && (
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                No requests in changeset
              </Text>
            )}
          </div>

          <div style={{ marginTop: "16px" }}>
            <Text weight="semibold">Independent Requests</Text>
            {requests
              .filter((r) => !r.inChangeset)
              .map((req) => (
                <div key={req.id} className={styles.requestItem} style={{ marginTop: "8px" }}>
                  <Badge color="informative">{req.method}</Badge>
                  <Text size={200}>{req.url}</Text>
                </div>
              ))}
            {requests.filter((r) => !r.inChangeset).length === 0 && (
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                No independent requests
              </Text>
            )}
          </div>

          <div className={styles.dependencyGraph}>
            <Text weight="semibold">Dependency Graph</Text>
            <div style={{ marginTop: "12px" }}>
              <div className={styles.graphNode}>
                <Text size={200}>1. Create Account</Text>
              </div>
              <span className={styles.arrow}>→</span>
              <div className={styles.graphNode}>
                <Text size={200}>2. Create Contact (refs $1)</Text>
              </div>
            </div>
            <Text size={200} style={{ marginTop: "8px", color: tokens.colorNeutralForeground3 }}>
              Content-ID references enable linking records within a changeset
            </Text>
          </div>
        </Card>
      </div>

      {executing && progress && (
        <ProgressTracker
          total={progress.total}
          current={progress.current}
          label="Executing batch request..."
          successCount={progress.successCount}
          errorCount={progress.errorCount}
        />
      )}

      {error && (
        <ErrorDisplay error={error} onDismiss={() => setError(null)} onRetry={executeBatch} />
      )}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Batch Execution Results",
              code: `Total Requests: ${String(results.totalRequests)}
Changeset Requests: ${String(results.changesetCount)}
Duration: ${String(results.duration)}`,
              result: JSON.stringify(
                {
                  successCount: results.successCount,
                  errorCount: results.errorCount,
                  responsePreview: results.responsePreview,
                },
                null,
                2
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
