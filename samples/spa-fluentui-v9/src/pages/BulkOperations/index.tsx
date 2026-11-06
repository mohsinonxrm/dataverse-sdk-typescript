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
  Spinner,
} from "@fluentui/react-components";
import {
  DatabaseMultipleRegular,
  CloudArrowUpRegular,
  ArrowSyncRegular,
} from "@fluentui/react-icons";
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
    backgroundColor: (tokens as any).colorNeutralBackground2,
  },
  table: {
    width: "100%",
    marginTop: "16px",
    borderCollapse: "collapse",
    "& th, & td": {
      padding: "12px",
      textAlign: "left",
      borderBottom: `1px solid ${(tokens as any).colorNeutralStroke1}`,
    },
    "& th": {
      fontWeight: 600,
      backgroundColor: (tokens as any).colorNeutralBackground3,
    },
  },
});

export default function BulkOperations() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

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
      const targets = [];

      for (let i = 1; i <= count; i++) {
        (targets as any).push({
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          name: `Bulk Account ${(Date as any).now()}-${i}`,
          revenue: (Math as any).floor((Math as any).random() * 10000000),
          numberofemployees: (Math as any).floor((Math as any).random() * 1000),
        });

        // Update progress
        setProgress((prev: any) => ({ ...prev, current: i }));
      }

      // Execute CreateMultiple action
      const startTime = (Date as any).now();
      const response = await (client as any).api("/CreateMultiple").post({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors", // Continue on errors
      });
      const endTime = (Date as any).now();

      setResults({
        operation: "CreateMultiple",
        count: (response as any).Ids?.length || count,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        idsCreated: (response as any).Ids,
      });

      setProgress((prev: any) => ({
        ...prev,
        successCount: (response as any).Ids?.length || count,
      }));
    } catch (err) {
      setError(err as Error);
      setProgress((prev: any) => ({ ...prev, errorCount: 1 }));
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
        .get();

      const accounts = (accountsResponse as any).value;
      if (!accounts || (accounts as any).length === 0) {
        throw new Error("No accounts found to update. Create some accounts first.");
      }

      const targets = (accounts as any).map((account: any, i: number) => {
        setProgress((prev: any) => ({ ...prev, current: i + 1 }));
        return {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: (account as any).accountid,
          name: `${(account as any).name} (Updated ${(Date as any).now()})`,
          revenue: (Math as any).floor((Math as any).random() * 10000000),
        };
      });

      // Execute UpdateMultiple action
      const startTime = (Date as any).now();
      await (client as any).api("/UpdateMultiple").post({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors",
      });
      const endTime = (Date as any).now();

      setResults({
        operation: "UpdateMultiple",
        count: (targets as any).length,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        message: "Records updated successfully (204 No Content)",
      });

      setProgress((prev: any) => ({ ...prev, successCount: (targets as any).length }));
    } catch (err) {
      setError(err as Error);
      setProgress((prev: any) => ({ ...prev, errorCount: 1 }));
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
      const targets = [];

      // Get some existing accounts
      const accountsResponse = await client
        .api("/accounts")
        .select()
        .top((Math as any).floor(count / 2))
        .get();

      const existingAccounts = (accountsResponse as any).value || [];

      // Mix of updates and creates
      for (let i = 0; i < count; i++) {
        const target: any = {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          name: `Upsert Account ${(Date as any).now()}-${i}`,
          revenue: (Math as any).floor((Math as any).random() * 10000000),
        };

        // 50% will be updates (if we have existing accounts)
        if (i < (existingAccounts as any).length) {
          (target as any).accountid = existingAccounts[i].accountid;
        }

        (targets as any).push(target);
        setProgress((prev: any) => ({ ...prev, current: i + 1 }));
      }

      // Execute UpsertMultiple action
      const startTime = (Date as any).now();
      await (client as any).api("/UpsertMultiple").post({
        Targets: targets,
        ConcurrencyBehavior: "IgnoreErrors",
      });
      const endTime = (Date as any).now();

      setResults({
        operation: "UpsertMultiple",
        count: (targets as any).length,
        created: (targets as any).filter((t) => !(t as any).accountid).length,
        updated: (targets as any).filter((t) => (t as any).accountid).length,
        duration: `${((endTime - startTime) / 1000).toFixed(2)}s`,
        message: "Records upserted successfully (204 No Content)",
      });

      setProgress((prev: any) => ({ ...prev, successCount: (targets as any).length }));
    } catch (err) {
      setError(err as Error);
      setProgress((prev: any) => ({ ...prev, errorCount: 1 }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Bulk Operations</Title3>
        <Text className={(styles as any).description}>
          High-performance operations for creating, updating, or upserting hundreds of records
          efficiently
        </Text>
      </div>

      <div className={(styles as any).grid}>
        <Card className={(styles as any).card}>
          <Title3>CreateMultiple</Title3>
          <Text>Create multiple records in a single request</Text>

          <div className={(styles as any).input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount((data as any).value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={(styles as any).actions}>
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

        <Card className={(styles as any).card}>
          <Title3>UpdateMultiple</Title3>
          <Text>Update multiple existing records in a single request</Text>

          <div className={(styles as any).input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount((data as any).value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={(styles as any).actions}>
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

        <Card className={(styles as any).card}>
          <Title3>UpsertMultiple</Title3>
          <Text>Create or update multiple records (mixed operation)</Text>

          <div className={(styles as any).input}>
            <Label>Number of Records</Label>
            <Input
              type="number"
              value={recordCount}
              onChange={(_e, data) => setRecordCount((data as any).value)}
              min={1}
              max={1000}
            />
          </div>

          <div className={(styles as any).actions}>
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
          total={(progress as any).total}
          current={(progress as any).current}
          label={`Executing ${operation}...`}
          successCount={(progress as any).successCount}
          errorCount={(progress as any).errorCount}
        />
      )}

      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Operation",
              code: `await client.api('/${(results as any).operation}').post({
  Targets: [...],
  ConcurrencyBehavior: 'IgnoreErrors'
})`,
              result: (JSON as any).stringify(results, null, 2),
            },
          ]}
        />
      )}

      <Card className={(styles as any).decisionMatrix}>
        <Title3>When to Use: Bulk Operations vs $batch</Title3>
        <table className={(styles as any).table}>
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
