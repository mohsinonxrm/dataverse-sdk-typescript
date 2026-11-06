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
  Input,
  Label,
  Textarea,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import {
  FilterRegular,
  ArrowSyncRegular,
  DocumentBulletListRegular,
  CodeRegular,
} from "@fluentui/react-icons";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { CodeComparison } from "../../components/demo/CodeComparison";
import type { PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import type { ResultView, JsonObject } from "../../types/common";

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
  filterBuilder: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
  },
  filterRow: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  results: {
    marginTop: "24px",
  },
  resultCard: {
    padding: "16px",
    marginBottom: "12px",
  },
});

type TabValue = "filter" | "pagination" | "expand" | "fetchxml";

export default function AdvancedQuerying() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("filter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<ResultView | null>(null);

  // Filter builder state
  const [filterField, setFilterField] = useState("name");
  const [filterOperator, setFilterOperator] = useState("contains");
  const [filterValue, setFilterValue] = useState("Contoso");

  // FetchXML state
  const [fetchXml, setFetchXml] = useState(`<fetch top="10">
  <entity name="account">
    <attribute name="name" />
    <attribute name="revenue" />
    <attribute name="numberofemployees" />
    <filter>
      <condition attribute="revenue" operator="gt" value="1000000" />
    </filter>
    <order attribute="name" />
  </entity>
</fetch>`);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleFilterQuery = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const filter = `${filterOperator}(${filterField}, '${filterValue}')`;
      const response = await client
        .api("/accounts")
        .select()
        .filter(filter)
        .top(10)
        .get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationDemo = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Demonstrate different pagination approaches
      const builder = client.api("/accounts").select().orderBy("name").top(5);

      // 1. Single page
      const singlePage = await builder.get<PageResponse<JsonObject>>();

      // 2. Page with nextLink
      const pageWithLink = await builder.getPage<JsonObject>();

      // 3. Iterate approach (get first 3 items)
      const iteratedItems: JsonObject[] = [];
      let count = 0;
      for await (const item of builder.iterate<JsonObject>()) {
        iteratedItems.push(item);
        count++;
        if (count >= 3) break;
      }

      // 4. Get all (bounded)
      const allItems = await builder.getAll({ maxItems: 10 });

      setResults({
        singlePage: singlePage.value,
        pageWithLink: {
          value: pageWithLink.value,
          hasNext: !!pageWithLink["@odata.nextLink"],
        },
        iteratedItems,
        allItems,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandQuery = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Note: Object-based expand syntax not yet implemented in SDK
      // Using string-based expand as workaround
      const response = await client
        .api("/contacts")
        .select("fullname", "emailaddress1")
        .expand("parentcustomerid_account($select=name,revenue)")
        .top(5)
        .get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchXmlQuery = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const encodedFetchXml = encodeURIComponent(fetchXml);
      const response = await client.api(`/accounts?fetchXml=${encodedFetchXml}`).get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderFilterTab = () => (
    <div>
      <Card>
        <div className={styles.filterBuilder}>
          <Title3>Filter Builder</Title3>
          <Text>Build OData filter expressions interactively</Text>

          <div className={styles.filterRow}>
            <div style={{ flex: 1 }}>
              <Label>Field</Label>
              <Input
                value={filterField}
                onChange={(_e, data) => setFilterField(data.value)}
                placeholder="Field name"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Label>Operator</Label>
              <Dropdown
                value={filterOperator}
                selectedOptions={[filterOperator]}
                onOptionSelect={(_e, data) => setFilterOperator(data.optionValue as string)}
              >
                <Option value="contains">contains</Option>
                <Option value="startswith">startswith</Option>
                <Option value="endswith">endswith</Option>
                <Option value="eq">equals</Option>
                <Option value="ne">not equals</Option>
                <Option value="gt">greater than</Option>
                <Option value="lt">less than</Option>
              </Dropdown>
            </div>
            <div style={{ flex: 1 }}>
              <Label>Value</Label>
              <Input
                value={filterValue}
                onChange={(_e, data) => setFilterValue(data.value)}
                placeholder="Filter value"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<FilterRegular />}
              onClick={handleFilterQuery}
              disabled={loading}
            >
              Execute Filter
            </Button>
          </div>
        </div>
      </Card>

      {error && (
        <ErrorDisplay error={error} onDismiss={() => setError(null)} onRetry={handleFilterQuery} />
      )}

      {results && (
        <div className={styles.results}>
          <CodeComparison
            items={[
              {
                label: "Generated Filter",
                code: `${filterOperator}(${filterField}, '${filterValue}')`,
                result: null,
              },
              {
                label: "Results",
                code: "",
                result: JSON.stringify(results, null, 2),
              },
            ]}
          />
        </div>
      )}
    </div>
  );

  const renderPaginationTab = () => (
    <div>
      <Card>
        <Title3>Pagination Approaches</Title3>
        <Text>Compare different pagination methods</Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<ArrowSyncRegular />}
            onClick={handlePaginationDemo}
            disabled={loading}
          >
            Run Pagination Demo
          </Button>
        </div>
      </Card>

      {error && (
        <ErrorDisplay
          error={error}
          onDismiss={() => setError(null)}
          onRetry={handlePaginationDemo}
        />
      )}

      {results && (
        <div className={styles.results}>
          <CodeComparison
            items={[
              {
                label: "get() - Single Page",
                code: `await client.api('/accounts')
  .select()
  .top(5)
  .get()`,
                result: JSON.stringify(results.singlePage, null, 2),
              },
              {
                label: "getPage() - With NextLink",
                code: `await client.api('/accounts')
  .select()
  .top(5)
  .getPage()`,
                result: JSON.stringify(results.pageWithLink, null, 2),
              },
              {
                label: "iterate() - First 3 Items",
                code: `for await (const item of builder.iterate()) {
  // Process item
  if (count >= 3) break;
}`,
                result: JSON.stringify(results.iteratedItems, null, 2),
              },
              {
                label: "getAll() - Bounded (max 10)",
                code: `await builder.getAll({ maxItems: 10 })`,
                result: JSON.stringify(results.allItems, null, 2),
              },
            ]}
          />
        </div>
      )}
    </div>
  );

  const renderExpandTab = () => (
    <div>
      <Card>
        <Title3>Expand Navigation Properties</Title3>
        <Text>Retrieve related entities in a single request</Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<DocumentBulletListRegular />}
            onClick={handleExpandQuery}
            disabled={loading}
          >
            Execute Expand Query
          </Button>
        </div>
      </Card>

      {error && (
        <ErrorDisplay error={error} onDismiss={() => setError(null)} onRetry={handleExpandQuery} />
      )}

      {results && (
        <div className={styles.results}>
          <CodeComparison
            items={[
              {
                label: "Expand Query",
                code: `await client.api('/contacts')
  .select()
  .expand({
    parentcustomerid_account: {
      select: ['name', 'revenue']
    }
  })
  .top(5)
  .get()`,
                result: JSON.stringify(results, null, 2),
              },
            ]}
          />
        </div>
      )}
    </div>
  );

  const renderFetchXmlTab = () => (
    <div>
      <Card>
        <Title3>FetchXML Query</Title3>
        <Text>Execute complex queries using FetchXML syntax</Text>

        <div className={styles.filterBuilder}>
          <Label>FetchXML</Label>
          <Textarea
            value={fetchXml}
            onChange={(_e, data) => setFetchXml(data.value)}
            rows={12}
            style={{ fontFamily: "monospace", fontSize: "12px" }}
          />

          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={<CodeRegular />}
              onClick={handleFetchXmlQuery}
              disabled={loading}
            >
              Execute FetchXML
            </Button>
          </div>
        </div>
      </Card>

      {error && (
        <ErrorDisplay
          error={error}
          onDismiss={() => setError(null)}
          onRetry={handleFetchXmlQuery}
        />
      )}

      {results && (
        <div className={styles.results}>
          <CodeComparison
            items={[
              {
                label: "Results",
                code: "",
                result: JSON.stringify(results, null, 2),
              },
            ]}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Advanced Querying</Title3>
        <Text className={styles.description}>
          Master OData queries, pagination strategies, expand navigation, and FetchXML
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as TabValue)}
        className={styles.tabs}
      >
        <Tab value="filter" icon={<FilterRegular />}>
          Filter Builder
        </Tab>
        <Tab value="pagination" icon={<ArrowSyncRegular />}>
          Pagination
        </Tab>
        <Tab value="expand" icon={<DocumentBulletListRegular />}>
          Expand
        </Tab>
        <Tab value="fetchxml" icon={<CodeRegular />}>
          FetchXML
        </Tab>
      </TabList>

      <div className={styles.content}>
        {loading && <LoadingState label="Executing query..." />}
        {!loading && selectedTab === "filter" && renderFilterTab()}
        {!loading && selectedTab === "pagination" && renderPaginationTab()}
        {!loading && selectedTab === "expand" && renderExpandTab()}
        {!loading && selectedTab === "fetchxml" && renderFetchXmlTab()}
      </div>
    </div>
  );
}
