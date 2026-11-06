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
  Tab,
  TabList,
} from "@fluentui/react-components";
import {
  PersonCircleRegular,
  TrophyRegular,
  FlowRegular,
  PlayCircleRegular,
} from "@fluentui/react-icons";
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
    color: (tokens as any).colorNeutralForeground2,
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

type TabValue = "functions" | "actions";

export default function ActionsFunctions() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("functions");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any>(null);

  // Function state
  const [userId, setUserId] = useState("");

  // Action state
  const [opportunityId, setOpportunityId] = useState("");
  const [workflowId, setWorkflowId] = useState("");
  const [targetEntityId, setTargetEntityId] = useState("");

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleWhoAmI = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // WhoAmI is an unbound function (GET request)
      const response = await (client as any).api("/WhoAmI").get();

      setResults({
        function: "WhoAmI",
        userId: (response as any).UserId,
        businessUnitId: (response as any).BusinessUnitId,
        organizationId: (response as any).OrganizationId,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieveVersion = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      const response = await (client as any).api("/RetrieveVersion").get();

      setResults({
        function: "RetrieveVersion",
        version: (response as any).Version,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrievePrincipalAccess = async () => {
    if (!client || !userId || !targetEntityId) return;
    setLoading(true);
    setError(null);

    try {
      // Bound function with parameter aliases
      const response = await client
        .api(
          `/systemusers(${userId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@target)?@target={'@odata.type':'Microsoft.Dynamics.CRM.account','accountid':'${targetEntityId}'}`
        )
        .get();

      setResults({
        function: "RetrievePrincipalAccess",
        userId,
        targetEntityId,
        accessRights: (response as any).AccessRights,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleWinOpportunity = async () => {
    if (!client || !opportunityId) return;
    setLoading(true);
    setError(null);

    try {
      // WinOpportunity is an unbound action (POST request)
      const response = await (client as any).api("/WinOpportunity").post({
        OpportunityClose: {
          "@odata.type": "Microsoft.Dynamics.CRM.opportunityclose",
          subject: "Won Opportunity",
          "opportunityid@odata.bind": `/opportunities(${opportunityId})`,
        },
        Status: 3, // Won
      });

      setResults({
        action: "WinOpportunity",
        opportunityId,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteWorkflow = async () => {
    if (!client || !workflowId || !targetEntityId) return;
    setLoading(true);
    setError(null);

    try {
      // ExecuteWorkflow is bound to workflow entity
      const response = await (client as any)
        .api(`/workflows(${workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`)
        .post({
          EntityId: targetEntityId,
        });

      setResults({
        action: "ExecuteWorkflow",
        workflowId,
        targetEntityId,
        asyncOperationId: (response as any).asyncoperationid,
        status: "Workflow started",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrantAccess = async () => {
    if (!client || !userId || !targetEntityId) return;
    setLoading(true);
    setError(null);

    try {
      // GrantAccess action
      await (client as any).api("/GrantAccess").post({
        Target: {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: targetEntityId,
        },
        PrincipalAccess: {
          Principal: {
            "@odata.type": "Microsoft.Dynamics.CRM.systemuser",
            systemuserid: userId,
          },
          AccessMask: "ReadAccess,WriteAccess",
        },
      });

      setResults({
        action: "GrantAccess",
        userId,
        targetEntityId,
        accessGranted: "ReadAccess, WriteAccess",
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderFunctionsTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Unbound Functions</Title3>
        <Text>Functions are GET requests with no side effects</Text>

        <div className={(styles as any).actions}>
          <Button appearance="primary" icon={<PersonCircleRegular />} onClick={handleWhoAmI}>
            WhoAmI
          </Button>
          <Button onClick={handleRetrieveVersion}>RetrieveVersion</Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Bound Functions</Title3>
        <Text>Functions bound to entity instances (use parameter aliases)</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>User ID</Label>
            <Input
              value={userId}
              onChange={(_e, data) => setUserId((data as any).value)}
              placeholder="System user GUID"
            />
          </div>
          <div>
            <Label>Target Entity ID (Account)</Label>
            <Input
              value={targetEntityId}
              onChange={(_e, data) => setTargetEntityId((data as any).value)}
              placeholder="Account GUID"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            onClick={handleRetrievePrincipalAccess}
            disabled={!userId || !targetEntityId}
          >
            RetrievePrincipalAccess
          </Button>
        </div>
      </Card>

      {results && (results as any).function && (
        <CodeComparison
          items={[
            {
              label: "Function Call",
              code:
                (results as any).function === "WhoAmI"
                  ? `await client.api('/WhoAmI').get()`
                  : (results as any).function === "RetrieveVersion"
                    ? `await client.api('/RetrieveVersion').get()`
                    : `await client.api('/systemusers(${userId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@target)?@target={...}').get()`,
              result: (JSON as any).stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  const renderActionsTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Business Actions</Title3>
        <Text>Actions are POST requests that may have side effects</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Opportunity ID</Label>
            <Input
              value={opportunityId}
              onChange={(_e, data) => setOpportunityId((data as any).value)}
              placeholder="Opportunity GUID"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<TrophyRegular />}
            onClick={handleWinOpportunity}
            disabled={!opportunityId}
          >
            WinOpportunity
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Workflow Actions</Title3>
        <Text>Execute workflows and background processes</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Workflow ID</Label>
            <Input
              value={workflowId}
              onChange={(_e, data) => setWorkflowId((data as any).value)}
              placeholder="Workflow GUID"
            />
          </div>
          <div>
            <Label>Target Entity ID</Label>
            <Input
              value={targetEntityId}
              onChange={(_e, data) => setTargetEntityId((data as any).value)}
              placeholder="Record GUID"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<FlowRegular />}
            onClick={handleExecuteWorkflow}
            disabled={!workflowId || !targetEntityId}
          >
            ExecuteWorkflow
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Security Actions</Title3>
        <Text>Grant or revoke access to records</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>User ID</Label>
            <Input
              value={userId}
              onChange={(_e, data) => setUserId((data as any).value)}
              placeholder="System user GUID"
            />
          </div>
          <div>
            <Label>Target Entity ID (Account)</Label>
            <Input
              value={targetEntityId}
              onChange={(_e, data) => setTargetEntityId((data as any).value)}
              placeholder="Account GUID"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            onClick={handleGrantAccess}
            disabled={!userId || !targetEntityId}
          >
            GrantAccess
          </Button>
        </div>
      </Card>

      {results && (results as any).action && (
        <CodeComparison
          items={[
            {
              label: "Action Call",
              code:
                (results as any).action === "WinOpportunity"
                  ? `await client.api('/WinOpportunity').post({
  OpportunityClose: {
    '@odata.type': 'Microsoft.Dynamics.CRM.opportunityclose',
    subject: 'Won Opportunity',
    'opportunityid@odata.bind': '/opportunities(${opportunityId})'
  },
  Status: 3
})`
                  : (results as any).action === "ExecuteWorkflow"
                    ? `await client.api('/workflows(${workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow').post({
  EntityId: '${targetEntityId}'
})`
                    : `await client.api('/GrantAccess').post({
  Target: { '@odata.type': 'Microsoft.Dynamics.CRM.account', accountid: '${targetEntityId}' },
  PrincipalAccess: {
    Principal: { '@odata.type': 'Microsoft.Dynamics.CRM.systemuser', systemuserid: '${userId}' },
    AccessMask: 'ReadAccess,WriteAccess'
  }
})`,
              result: (JSON as any).stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Actions & Functions</Title3>
        <Text className={(styles as any).description}>
          Execute typed Web API actions (POST) and functions (GET) with compile-time safety
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab((data as any).value as TabValue)}
        className={(styles as any).tabs}
      >
        <Tab value="functions" icon={<PersonCircleRegular />}>
          Functions (GET)
        </Tab>
        <Tab value="actions" icon={<PlayCircleRegular />}>
          Actions (POST)
        </Tab>
      </TabList>

      <div className={(styles as any).content}>
        {loading && <LoadingState label="Executing operation..." />}
        {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

        {!loading && selectedTab === "functions" && renderFunctionsTab()}
        {!loading && selectedTab === "actions" && renderActionsTab()}
      </div>
    </div>
  );
}
