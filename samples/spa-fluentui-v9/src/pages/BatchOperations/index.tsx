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
    color: (tokens as any).colorNeutralForeground2,
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
    backgroundColor: (tokens as any).colorNeutralBackground2,
    borderRadius: (tokens as any).borderRadiusMedium,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changesetBox: {
    padding: "16px",
    marginTop: "12px",
    border: `2px dashed ${(tokens as any).colorBrandStroke1}`,
    borderRadius: (tokens as any).borderRadiusMedium,
  },
  dependencyGraph: {
    marginTop: "24px",
  },
  graphNode: {
    padding: "12px",
    margin: "8px",
    backgroundColor: (tokens as any).colorNeutralBackground3,
    borderRadius: (tokens as any).borderRadiusMedium,
    display: "inline-block",
  },
  arrow: {
    display: "inline-block",
    margin: "0 8px",
    color: (tokens as any).colorBrandForeground1,
  },
});

interface BatchRequest {
  id: number;
  method: string;
  url: string;
  body?: any;
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
  const [results, setResults] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const addRequest = (method: string, url: string, body?: any, inChangeset = false) => {
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
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Batch Operations</Title3>
        <Text className={(styles as any).description}>
          Execute multiple operations in a single request with changeset support and dependency
          tracking
        </Text>
      </div>

      <div className={(styles as any).builder}>
        <Card className={(styles as any).requestList}>
          <Title3>Batch Request Builder</Title3>
          <Text>Add requests to the batch (max 1000)</Text>

          <div className={(styles as any).actions}>
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
            <Text weight="semibold">Requests in Batch: {(requests as any).length} / 1000</Text>
            {(requests as any).map((req) => (
              <div key={(req as any).id} className={(styles as any).requestItem}>
                <div>
                  <Badge
                    appearance="filled"
                    color={
                      (req as any).method === "POST"
                        ? "success"
                        : (req as any).method === "PATCH"
                          ? "warning"
                          : (req as any).method === "DELETE"
                            ? "danger"
                            : "informative"
                    }
                  >
                    {(req as any).method}
                  </Badge>
                  <Text style={{ marginLeft: "8px" }}>{(req as any).url}</Text>
                  {(req as any).inChangeset && (
                    <Badge appearance="outline" color="brand" style={{ marginLeft: "8px" }}>
                      Changeset
                    </Badge>
                  )}
                  {(req as any).contentId && (
                    <Text
                      size={200}
                      style={{ marginLeft: "8px", color: (tokens as any).colorNeutralForeground3 }}
                    >
                      Content-ID: {(req as any).contentId}
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<DatabaseRegular />}
              onClick={executeBatch}
              disabled={executing || (requests as any).length === 0}
            >
              Execute Batch
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).visualization}>
          <Title3>Changeset Visualization</Title3>
          <Text>Requests in changesets are transactional (all or nothing)</Text>

          <div className={(styles as any).changesetBox}>
            <Text weight="semibold">Changeset (Transactional)</Text>
            {requests
              .filter((r) => (r as any).inChangeset)
              .map((req) => (
                <div
                  key={(req as any).id}
                  className={(styles as any).requestItem}
                  style={{ marginTop: "8px" }}
                >
                  <Badge color="brand">{(req as any).method}</Badge>
                  <Text size={200}>{(req as any).url}</Text>
                </div>
              ))}
            {(requests as any).filter((r) => (r as any).inChangeset).length === 0 && (
              <Text size={200} style={{ color: (tokens as any).colorNeutralForeground3 }}>
                No requests in changeset
              </Text>
            )}
          </div>

          <div style={{ marginTop: "16px" }}>
            <Text weight="semibold">Independent Requests</Text>
            {requests
              .filter((r) => !(r as any).inChangeset)
              .map((req) => (
                <div
                  key={(req as any).id}
                  className={(styles as any).requestItem}
                  style={{ marginTop: "8px" }}
                >
                  <Badge color="informative">{(req as any).method}</Badge>
                  <Text size={200}>{(req as any).url}</Text>
                </div>
              ))}
            {(requests as any).filter((r) => !(r as any).inChangeset).length === 0 && (
              <Text size={200} style={{ color: (tokens as any).colorNeutralForeground3 }}>
                No independent requests
              </Text>
            )}
          </div>

          <div className={(styles as any).dependencyGraph}>
            <Text weight="semibold">Dependency Graph</Text>
            <div style={{ marginTop: "12px" }}>
              <div className={(styles as any).graphNode}>
                <Text size={200}>1. Create Account</Text>
              </div>
              <span className={(styles as any).arrow}>→</span>
              <div className={(styles as any).graphNode}>
                <Text size={200}>2. Create Contact (refs $1)</Text>
              </div>
            </div>
            <Text
              size={200}
              style={{ marginTop: "8px", color: (tokens as any).colorNeutralForeground3 }}
            >
              Content-ID references enable linking records within a changeset
            </Text>
          </div>
        </Card>
      </div>

      {executing && progress && (
        <ProgressTracker
          total={(progress as any).total}
          current={(progress as any).current}
          label="Executing batch request..."
          successCount={(progress as any).successCount}
          errorCount={(progress as any).errorCount}
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
              code: `Total Requests: ${(results as any).totalRequests}
Changeset Requests: ${(results as any).changesetCount}
Duration: ${(results as any).duration}`,
              result: (JSON as any).stringify(
                {
                  successCount: (results as any).successCount,
                  errorCount: (results as any).errorCount,
                  responsePreview: (results as any).responsePreview,
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
