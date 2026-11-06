import { useState } from "react";
import {
  makeStyles,
  tokens,
  Title3,
  Text,
  Tab,
  TabList,
  Card,
  Button,
} from "@fluentui/react-components";
import { Code24Regular, Document24Regular, Box24Regular } from "@fluentui/react-icons";
import type { Account } from "../../types/Account";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
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
  actions: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },
});

type TabValue = "raw" | "typed" | "orgservice";

/**
 * CRUD Operations Page
 *
 * Demonstrates three approaches to CRUD operations:
 * 1. Raw API - client.api('/accounts')
 * 2. Typed API - client.api('/accounts').post<Account>()
 * 3. OrgService - orgService.create(), retrieve(), etc.
 *
 * Shows side-by-side comparisons with identical operations.
 */
export default function CrudOperations() {
  const styles = useStyles();
  const { client, orgService, isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("raw");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<unknown>(null);

  if (!isReady) {
    return <LoadingState label="Initializing SDK..." />;
  }

  const handleExecuteCreate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const accountName = `Test Account ${Date.now()}`;
      let response: unknown;

      switch (selectedTab) {
        case "raw":
          response = await client!.api("/accounts").post({
            name: accountName,
            revenue: 1000000,
            numberofemployees: 250,
          });
          break;

        case "typed":
          response = await client!.api("/accounts").post<Account>({
            name: accountName,
            revenue: 1000000,
            numberofemployees: 250,
          });
          break;

        case "orgservice": {
          const id = await orgService!.create<string>("accounts", {
            name: accountName,
            revenue: 1000000,
            numberofemployees: 250,
          });
          response = { accountid: id };
          break;
        }
      }

      setResult(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const comparisonItems = [
    {
      label: "Raw API (client.api)",
      code: `const response = await client.api('/accounts').post({
  name: 'Contoso Ltd',
  revenue: 1000000,
  numberofemployees: 250
});

// Returns: { accountid: '...', ...other fields }`,
      result: selectedTab === "raw" && result ? <pre>{JSON.stringify(result, null, 2)}</pre> : null,
    },
    {
      label: "Typed API (post<T>, get<T>)",
      code: `const response = await client.api('/accounts').post<Account>({
  name: 'Contoso Ltd',
  revenue: 1000000,
  numberofemployees: 250
});

// Returns: { accountid: '...', ...other fields }
// With full TypeScript type inference`,
      result:
        selectedTab === "typed" && result ? <pre>{JSON.stringify(result, null, 2)}</pre> : null,
    },
    {
      label: "OrganizationService (C#-familiar)",
      code: `const accountId = await orgService.create('accounts', {
  name: 'Contoso Ltd',
  revenue: 1000000,
  numberofemployees: 250
});

// Returns: string (GUID of created record)
// Familiar to Dynamics 365 C# developers`,
      result:
        selectedTab === "orgservice" && result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : null,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>CRUD Operations</Title3>
        <Text className={styles.description}>
          Compare three approaches to Create, Read, Update, and Delete operations. Each approach
          provides the same functionality with different syntax and patterns.
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as TabValue)}
        className={styles.tabs}
      >
        <Tab value="raw" icon={<Code24Regular />}>
          Raw API
        </Tab>
        <Tab value="typed" icon={<Document24Regular />}>
          Typed API
        </Tab>
        <Tab value="orgservice" icon={<Box24Regular />}>
          OrganizationService
        </Tab>
      </TabList>

      {error && (
        <ErrorDisplay
          error={error}
          onDismiss={() => setError(null)}
          onRetry={handleExecuteCreate}
        />
      )}

      <div className={styles.actions}>
        <Button appearance="primary" onClick={handleExecuteCreate} disabled={loading}>
          {loading ? "Creating Account..." : "Execute Create Example"}
        </Button>
        <Button onClick={() => setResult(null)} disabled={!result}>
          Clear Result
        </Button>
      </div>

      <div className={styles.content}>
        <CodeComparison items={comparisonItems} />
      </div>

      <Card style={{ marginTop: "32px", padding: "24px" }}>
        <Title3>When to Use Which Approach?</Title3>
        <div style={{ marginTop: "16px" }}>
          <Text as="p" style={{ marginBottom: "12px" }}>
            <strong>Raw API</strong> - Use when you need full control over the HTTP request, working
            with dynamic scenarios, or when TypeScript types are not available.
          </Text>
          <Text as="p" style={{ marginBottom: "12px" }}>
            <strong>Typed API</strong> - Use when you want type safety and IntelliSense support.
            Best for TypeScript projects where you want to leverage compile-time type checking.
          </Text>
          <Text as="p">
            <strong>OrganizationService</strong> - Use when migrating from C# SDK or when you want
            concise, familiar syntax. Provides cleaner code for CRUD operations and hides HTTP
            implementation details.
          </Text>
        </div>
      </Card>
    </div>
  );
}
