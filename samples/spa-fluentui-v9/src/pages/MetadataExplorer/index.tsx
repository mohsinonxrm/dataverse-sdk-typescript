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
  Dropdown,
  Option,
  Tab,
  TabList,
} from "@fluentui/react-components";
import {
  DatabaseRegular,
  ColumnTripleEditRegular,
  DataTrendingRegular,
  ArrowSyncRegular,
} from "@fluentui/react-icons";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { CodeComparison } from "../../components/demo/CodeComparison";
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
});

type TabValue = "entities" | "attributes" | "optionsets" | "delta";

interface MetadataChanges {
  ServerVersionStamp: string;
  EntityMetadata: unknown[];
  DeletedMetadata: unknown;
}

export default function MetadataExplorer() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("entities");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<ResultView | null>(null);

  // Entity state
  const [entityLogicalName, setEntityLogicalName] = useState("new_customentity");
  const [entityDisplayName, setEntityDisplayName] = useState("Custom Entity");

  // Attribute state
  const [targetEntity, setTargetEntity] = useState("account");
  const [attributeName, setAttributeName] = useState("new_customfield");
  const [attributeType, setAttributeType] = useState("String");

  // Delta state
  const [clientTimestamp, setClientTimestamp] = useState("");

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleRetrieveEntities = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const response = await client
        .api("/EntityDefinitions")
        .select()
        .filter("IsCustomizable/Value eq true")
        .top(10)
        .get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntity = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const entityDefinition = {
        "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
        LogicalName: entityLogicalName,
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: entityDisplayName,
              LanguageCode: 1033,
            },
          ],
        },
        DisplayCollectionName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: `${entityDisplayName}s`,
              LanguageCode: 1033,
            },
          ],
        },
        OwnershipType: "UserOwned",
        HasActivities: false,
        HasNotes: false,
        IsActivity: false,
        Attributes: [
          {
            "@odata.type": "Microsoft.Dynamics.CRM.StringAttributeMetadata",
            AttributeType: "String",
            AttributeTypeName: { Value: "StringType" },
            LogicalName: `${entityLogicalName}name`,
            DisplayName: {
              "@odata.type": "Microsoft.Dynamics.CRM.Label",
              LocalizedLabels: [
                {
                  "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
                  Label: "Name",
                  LanguageCode: 1033,
                },
              ],
            },
            RequiredLevel: { Value: "None" },
            MaxLength: 100,
            FormatName: { Value: "Text" },
          },
        ],
      };

      const response = await client
        .api("/EntityDefinitions")
        .post<{ MetadataId: string }>(entityDefinition);

      setResults({
        operation: "Create Entity",
        entityId: response.MetadataId,
        logicalName: entityLogicalName,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieveAttributes = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const response = await client
        .api(`/EntityDefinitions(LogicalName='${targetEntity}')/Attributes`)
        .select()
        .filter("IsCustomizable/Value eq true")
        .top(10)
        .get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAttribute = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const attributeDefinition: JsonObject = {
        "@odata.type": `Microsoft.Dynamics.CRM.${attributeType}AttributeMetadata`,
        AttributeType: attributeType,
        AttributeTypeName: { Value: `${attributeType}Type` },
        LogicalName: attributeName,
        DisplayName: {
          "@odata.type": "Microsoft.Dynamics.CRM.Label",
          LocalizedLabels: [
            {
              "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
              Label: attributeName,
              LanguageCode: 1033,
            },
          ],
        },
        RequiredLevel: { Value: "None" },
        IsCustomizable: { Value: true },
      };

      // Add type-specific properties
      if (attributeType === "String") {
        attributeDefinition.MaxLength = 100;
        attributeDefinition.FormatName = { Value: "Text" };
      } else if (attributeType === "Integer") {
        attributeDefinition.Format = "None";
      } else if (attributeType === "Money") {
        attributeDefinition.PrecisionSource = 2;
      }

      const response = await client
        .api(`/EntityDefinitions(LogicalName='${targetEntity}')/Attributes`)
        .post<{ MetadataId: string }>(attributeDefinition);

      setResults({
        operation: "Create Attribute",
        attributeId: response.MetadataId,
        entity: targetEntity,
        attribute: attributeName,
        type: attributeType,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieveOptionSets = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const response = await client
        .api("/GlobalOptionSetDefinitions")
        .select()
        .top(10)
        .get<JsonObject>();

      setResults(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeltaQuery = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // RetrieveMetadataChanges example
      const query = {
        Query: {
          Criteria: {
            Conditions: [
              {
                PropertyName: "IsCustomEntity",
                ConditionOperator: "Equals",
                Value: { Value: true },
              },
            ],
          },
          Properties: {
            PropertyNames: ["LogicalName", "DisplayName", "EntitySetName"],
          },
        },
        ClientVersionStamp: clientTimestamp || null,
        DeletedMetadataFilters: "Entity",
      };

      // Note: This would use a typed action in the real SDK
      const response = await client.api("/RetrieveMetadataChanges").post<MetadataChanges>(query);

      setResults({
        operation: "Delta Query",
        serverTimestamp: response.ServerVersionStamp,
        entityMetadata: response.EntityMetadata,
        deletedMetadata: response.DeletedMetadata,
      });

      // Update client timestamp for next query
      setClientTimestamp(response.ServerVersionStamp);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderEntitiesTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Entity Operations</Title3>

        <div className={styles.form}>
          <div>
            <Label>Logical Name</Label>
            <Input
              value={entityLogicalName}
              onChange={(_e, data) => setEntityLogicalName(data.value)}
              placeholder="new_customentity"
            />
          </div>
          <div>
            <Label>Display Name</Label>
            <Input
              value={entityDisplayName}
              onChange={(_e, data) => setEntityDisplayName(data.value)}
              placeholder="Custom Entity"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button appearance="primary" icon={<DatabaseRegular />} onClick={handleRetrieveEntities}>
            Retrieve Entities
          </Button>
          <Button icon={<DatabaseRegular />} onClick={handleCreateEntity}>
            Create Entity
          </Button>
        </div>
      </Card>

      {results && (
        <CodeComparison
          items={[
            {
              label: "Response",
              code: "",
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  const renderAttributesTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Attribute Operations</Title3>

        <div className={styles.form}>
          <div>
            <Label>Target Entity</Label>
            <Input
              value={targetEntity}
              onChange={(_e, data) => setTargetEntity(data.value)}
              placeholder="account"
            />
          </div>
          <div>
            <Label>Attribute Name</Label>
            <Input
              value={attributeName}
              onChange={(_e, data) => setAttributeName(data.value)}
              placeholder="new_customfield"
            />
          </div>
          <div>
            <Label>Attribute Type</Label>
            <Dropdown
              value={attributeType}
              selectedOptions={[attributeType]}
              onOptionSelect={(_e, data) => setAttributeType(data.optionValue as string)}
            >
              <Option value="String">String</Option>
              <Option value="Integer">Integer</Option>
              <Option value="Money">Money</Option>
              <Option value="Decimal">Decimal</Option>
              <Option value="Boolean">Boolean</Option>
              <Option value="DateTime">DateTime</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<ColumnTripleEditRegular />}
            onClick={handleRetrieveAttributes}
          >
            Retrieve Attributes
          </Button>
          <Button icon={<ColumnTripleEditRegular />} onClick={handleCreateAttribute}>
            Create Attribute
          </Button>
        </div>
      </Card>

      {results && (
        <CodeComparison
          items={[
            {
              label: "Response",
              code: "",
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  const renderOptionSetsTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Global Option Sets</Title3>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<DataTrendingRegular />}
            onClick={handleRetrieveOptionSets}
          >
            Retrieve Global Option Sets
          </Button>
        </div>
      </Card>

      {results && (
        <CodeComparison
          items={[
            {
              label: "Response",
              code: "",
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  const renderDeltaTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Delta Queries (RetrieveMetadataChanges)</Title3>
        <Text>Query metadata changes since last sync</Text>

        <div className={styles.form}>
          <div>
            <Label>Client Timestamp</Label>
            <Input
              value={clientTimestamp}
              onChange={(_e, data) => setClientTimestamp(data.value)}
              placeholder="Leave empty for initial query"
            />
            <Text size={200}>
              {clientTimestamp
                ? "Will return only changes since this timestamp"
                : "Will return all metadata (initial query)"}
            </Text>
          </div>
        </div>

        <div className={styles.actions}>
          <Button appearance="primary" icon={<ArrowSyncRegular />} onClick={handleDeltaQuery}>
            Execute Delta Query
          </Button>
        </div>
      </Card>

      {results && (
        <CodeComparison
          items={[
            {
              label: "Response",
              code: `Server Timestamp: ${typeof results.serverTimestamp === "string" ? results.serverTimestamp : "N/A"}`,
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Metadata Explorer</Title3>
        <Text className={styles.description}>
          CRUD operations for entities, attributes, option sets, and delta queries
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as TabValue)}
        className={styles.tabs}
      >
        <Tab value="entities" icon={<DatabaseRegular />}>
          Entities
        </Tab>
        <Tab value="attributes" icon={<ColumnTripleEditRegular />}>
          Attributes
        </Tab>
        <Tab value="optionsets" icon={<DataTrendingRegular />}>
          Option Sets
        </Tab>
        <Tab value="delta" icon={<ArrowSyncRegular />}>
          Delta Queries
        </Tab>
      </TabList>

      <div className={styles.content}>
        {loading && <LoadingState label="Processing metadata operation..." />}
        {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

        {!loading && selectedTab === "entities" && renderEntitiesTab()}
        {!loading && selectedTab === "attributes" && renderAttributesTab()}
        {!loading && selectedTab === "optionsets" && renderOptionSetsTab()}
        {!loading && selectedTab === "delta" && renderDeltaTab()}
      </div>
    </div>
  );
}
