import { useState } from "react";
import {
  makeStyles,
  tokens,
  Title3,
  Text,
  Card,
  Button,
  Input,
  Label,
} from "@fluentui/react-components";
import {
  DatabaseMultipleRegular,
  CloudArrowUpRegular,
  ArrowSyncRegular,
} from "@fluentui/react-icons";
import type { PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import type { Account } from "../../types/Account";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { ProgressTracker } from "../../components/demo/ProgressTracker";
import { CodeComparison } from "../../components/demo/CodeComparison";
import {
  patchProgress,
  type ResultView,
  type ProgressState,
  type JsonObject,
} from "../../types/common";

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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },
  card: {
    padding: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  input: {
    marginTop: "8px",
  },
  decisionMatrix: {
    marginTop: "32px",
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  table: {
    width: "100%",
    marginTop: "16px",
    borderCollapse: "collapse",
    "& th, & td": {
      padding: "12px",
      textAlign: "left",
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    },
    "& th": {
      fontWeight: 600,
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
});

/** Deterministic sample revenue for the demo records (no randomness needed). */
const demoRevenue = (index: number) => (index * 137_000) % 10_000_000;

export default function BulkOperations() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [results, setResults] = useState<ResultView | null>(null);

  // Operation state
  const [recordCount, setRecordCount] = useState("100");
  const [operation, setOperation] = useState<"create" | "update" | "upsert" | null>(null);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleCreateMultiple = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);
    setOperation("create");
    setProgress({ total: parseInt(recordCount), current: 0, successCount: 0, errorCount: 0 });

    try {
      const count = parseInt(recordCount);
      const targets: JsonObject[] = [];

      for (let i = 1; i <= count; i++) {
        targets.push({
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          name: `Bulk Account ${Date.now()}-${i}`,
          revenue: demoRevenue(i),
          numberofemployees: 10 + ((i * 37) % 990),
        });

        // Update progress
        setProgress(patchProgress({ current: i }));
      }

      // Execute CreateMultiple action
      const startTime = Date.now();
      const response = await client.api("/CreateMultiple").post<{ Ids?: string[] }>({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors", // Continue on errors
      });
      const endTime = Date.now();

      setResults({
        operation: "CreateMultiple",
        count: response.Ids?.length || count,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        idsCreated: response.Ids,
      });

      setProgress(patchProgress({ successCount: response.Ids?.length || count }));
    } catch (err) {
      setError(err as Error);
      setProgress(patchProgress({ errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMultiple = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);
    setOperation("update");
    setProgress({ total: parseInt(recordCount), current: 0, successCount: 0, errorCount: 0 });

    try {
      // First, get some accounts to update
      const accountsResponse = await client
        .api("/accounts")
        .select()
        .top(parseInt(recordCount))
        .get<PageResponse<Account>>();

      const accounts = accountsResponse.value;
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found to update. Create some accounts first.");
      }

      const targets = accounts.map((account, i) => {
        setProgress(patchProgress({ current: i + 1 }));
        return {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: account.accountid,
          name: `${account.name} (Updated ${Date.now()})`,
          revenue: demoRevenue(i),
        };
      });

      // Execute UpdateMultiple action
      const startTime = Date.now();
      await client.api("/UpdateMultiple").post<JsonObject>({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors",
      });
      const endTime = Date.now();

      setResults({
        operation: "UpdateMultiple",
        count: targets.length,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        message: "Records updated successfully (204 No Content)",
      });

      setProgress(patchProgress({ successCount: targets.length }));
    } catch (err) {
      setError(err as Error);
      setProgress(patchProgress({ errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  const handleUpsertMultiple = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);
    setOperation("upsert");
    setProgress({ total: parseInt(recordCount), current: 0, successCount: 0, errorCount: 0 });

    try {
      const count = parseInt(recordCount);
      const targets: JsonObject[] = [];

      // Get some existing accounts
      const accountsResponse = await client
        .api("/accounts")
        .select()
        .top(Math.floor(count / 2))
        .get<PageResponse<Account>>();

      const existingAccounts = accountsResponse.value;

      // Mix of updates and creates
      for (let i = 0; i < count; i++) {
        const target: JsonObject = {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          name: `Upsert Account ${Date.now()}-${i}`,
          revenue: demoRevenue(i),
        };

        // 50% will be updates (if we have existing accounts)
        if (i < existingAccounts.length) {
          target.accountid = existingAccounts[i].accountid;
        }

        targets.push(target);
        setProgress(patchProgress({ current: i + 1 }));
      }

      // Execute UpsertMultiple action
      const startTime = Date.now();
      await client.api("/UpsertMultiple").post<JsonObject>({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors",
      });
      const endTime = Date.now();

      setResults({
        operation: "UpsertMultiple",
        count: targets.length,
        created: targets.filter((t) => !t.accountid).length,
        updated: targets.filter((t) => t.accountid).length,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        message: "Records upserted successfully (204 No Content)",
      });

      setProgress(patchProgress({ successCount: targets.length }));
    } catch (err) {
      setError(err as Error);
      setProgress(patchProgress({ errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Bulk Operations</Title3>
        <Text className={styles.description}>
          High-performance operations for creating, updating, or upserting hundreds of records
          efficiently
        </Text>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Title3>CreateMultiple</Title3>
          <Text>Create multiple records in a single request</Text>

          <div className={styles.input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount(data.value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<CloudArrowUpRegular />}
              onClick={handleCreateMultiple}
              disabled={loading}
            >
              Create {recordCount} Records
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>UpdateMultiple</Title3>
          <Text>Update multiple existing records in a single request</Text>

          <div className={styles.input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount(data.value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<ArrowSyncRegular />}
              onClick={handleUpdateMultiple}
              disabled={loading}
            >
              Update {recordCount} Records
            </Button>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>UpsertMultiple</Title3>
          <Text>Create or update multiple records (mixed operation)</Text>

          <div className={styles.input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount(data.value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<DatabaseMultipleRegular />}
              onClick={handleUpsertMultiple}
              disabled={loading}
            >
              Upsert {recordCount} Records
            </Button>
          </div>
        </Card>
      </div>

      {loading && progress && (
        <ProgressTracker
          total={progress.total}
          current={progress.current}
          label={`Executing ${operation}...`}
          successCount={progress.successCount}
          errorCount={progress.errorCount}
        />
      )}

      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Operation",
              code: `await client.api('/${String(results.operation)}').post({
  Targets: [...],
  ConcurrencyBehavior: 'IgnoreErrors'
})`,
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}

      <Card className={styles.decisionMatrix}>
        <Title3>When to Use: Bulk Operations vs $batch</Title3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Use Bulk Operations</th>
              <th>Use $batch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Single entity type, same operation</td>
              <td>✅ Recommended</td>
              <td>❌ Overkill</td>
            </tr>
            <tr>
              <td>Multiple entity types</td>
              <td>❌ Not supported</td>
              <td>✅ Recommended</td>
            </tr>
            <tr>
              <td>Mixed operations (create + update + delete)</td>
              <td>❌ Not supported</td>
              <td>✅ Recommended</td>
            </tr>
            <tr>
              <td>Transactional (all or nothing)</td>
              <td>⚠️ Limited (ConcurrencyBehavior)</td>
              <td>✅ Full changeset support</td>
            </tr>
            <tr>
              <td>Performance (100+ records)</td>
              <td>✅ Optimized for bulk</td>
              <td>⚠️ Good, but more overhead</td>
            </tr>
            <tr>
              <td>Error handling</td>
              <td>⚠️ Partial (IgnoreErrors)</td>
              <td>✅ Per-request error details</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
