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
  Textarea,
} from "@fluentui/react-components";
import {
  BoxMultipleRegular,
  CloudArrowUpRegular,
  CloudArrowDownRegular,
  PersonRegular,
  ArrowSwapRegular,
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

type TabValue = "common" | "solution" | "specialized";

export default function Messages() {
  const styles = useStyles();
  const { client, isReady } = useDataverse();
  const [selectedTab, setSelectedTab] = useState<TabValue>("common");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any>(null);

  // Common messages state
  const [targetEntityId, setTargetEntityId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [stateCode, setStateCode] = useState("1");
  const [statusCode, setStatusCode] = useState("-1");

  // Solution management state
  const [solutionName, setSolutionName] = useState("");
  const [solutionXml, setSolutionXml] = useState("");
  const [publishXml, setPublishXml] = useState(
    "<importexportxml><entities><entity>account</entity></entities></importexportxml>"
  );

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleAssign = async () => {
    if (!client || !targetEntityId || !assigneeId) return;
    setLoading(true);
    setError(null);

    try {
      // Assign message (can use XrmSdkMessages or raw action)
      await (client as any).api("/Assign").post({
        Target: {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: targetEntityId,
        },
        Assignee: {
          "@odata.type": "Microsoft.Dynamics.CRM.systemuser",
          systemuserid: assigneeId,
        },
      });

      setResults({
        message: "Assign",
        targetEntityId,
        assigneeId,
        status: "Success (204 No Content)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetState = async () => {
    if (!client || !targetEntityId) return;
    setLoading(true);
    setError(null);

    try {
      // SetState message
      await (client as any).api("/SetState").post({
        EntityMoniker: {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: targetEntityId,
        },
        State: parseInt(stateCode),
        Status: parseInt(statusCode),
      });

      setResults({
        message: "SetState",
        targetEntityId,
        stateCode,
        statusCode,
        status: "Success (204 No Content)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleMerge = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Merge message (requires two account GUIDs)
      await (client as any).api("/Merge").post({
        Target: {
          "@odata.type": "Microsoft.Dynamics.CRM.account",
          accountid: "target-guid-here",
        },
        SubordinateId: "subordinate-guid-here",
        UpdateContent: {
          name: "Merged Account Name",
        },
        PerformParentingChecks: false,
      });

      setResults({
        message: "Merge",
        status: "Success (204 No Content)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportSolution = async () => {
    if (!client || !solutionName) return;
    setLoading(true);
    setError(null);

    try {
      // ExportSolution message
      const response = await (client as any).api("/ExportSolution").post({
        SolutionName: solutionName,
        Managed: false,
        ExportAutoNumberingSettings: true,
        ExportCalendarSettings: true,
        ExportCustomizationSettings: true,
        ExportEmailTrackingSettings: true,
        ExportGeneralSettings: true,
        ExportMarketingSettings: true,
        ExportOutlookSynchronizationSettings: true,
        ExportRelationshipRoles: true,
        ExportIsvConfig: true,
        ExportSales: true,
        ExportExternalApplications: true,
      });

      // Response contains ExportSolutionFile (base64 zip)
      const solutionFile = (response as any).ExportSolutionFile;

      setResults({
        message: "ExportSolution",
        solutionName,
        fileSize: `${((solutionFile as any).length / 1024).toFixed(2)} KB`,
        status: "Success",
      });

      setSolutionXml((solutionFile as any).substring(0, 500) + "...");
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleImportSolution = async () => {
    if (!client || !solutionXml) return;
    setLoading(true);
    setError(null);

    try {
      // ImportSolution message
      const response = await (client as any).api("/ImportSolution").post({
        CustomizationFile: solutionXml, // Base64 encoded zip file
        PublishWorkflows: true,
        OverwriteUnmanagedCustomizations: false,
        SkipProductUpdateDependencies: false,
        ConvertToManaged: false,
        HoldingSolution: false,
      });

      setResults({
        message: "ImportSolution",
        importJobId: (response as any).importjobid,
        status: "Import started (async)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishXml = async () => {
    if (!client || !publishXml) return;
    setLoading(true);
    setError(null);

    try {
      // PublishXml message
      await (client as any).api("/PublishXml").post({
        ParameterXml: publishXml,
      });

      setResults({
        message: "PublishXml",
        publishedEntities: "account",
        status: "Success (204 No Content)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishAllXml = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // PublishAllXml message
      await (client as any).api("/PublishAllXml").post({});

      setResults({
        message: "PublishAllXml",
        status: "Success - All customizations published",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const renderCommonTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Assign Message</Title3>
        <Text>Assign a record to a user or team</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Target Entity ID (Account)</Label>
            <Input
              value={targetEntityId}
              onChange={(_e, data) => setTargetEntityId((data as any).value)}
              placeholder="Account GUID"
            />
          </div>
          <div>
            <Label>Assignee ID (SystemUser)</Label>
            <Input
              value={assigneeId}
              onChange={(_e, data) => setAssigneeId((data as any).value)}
              placeholder="User GUID"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<PersonRegular />}
            onClick={handleAssign}
            disabled={!targetEntityId || !assigneeId}
          >
            Assign
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>SetState Message</Title3>
        <Text>Change the state and status of a record</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>State Code</Label>
            <Input
              type="number"
              value={stateCode}
              onChange={(_e, data) => setStateCode((data as any).value)}
              placeholder="0 = Active, 1 = Inactive"
            />
          </div>
          <div>
            <Label>Status Code</Label>
            <Input
              type="number"
              value={statusCode}
              onChange={(_e, data) => setStatusCode((data as any).value)}
              placeholder="-1 for default"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<ArrowSwapRegular />}
            onClick={handleSetState}
            disabled={!targetEntityId}
          >
            SetState
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px" }}>
        <Title3>Merge Message</Title3>
        <Text>Merge two records (supports account, contact, lead, incident)</Text>

        <div className={(styles as any).actions}>
          <Button onClick={handleMerge}>Merge (Demo)</Button>
        </div>
      </Card>

      {results &&
        (results as any).message &&
        ((results as any).message === "Assign" ||
          (results as any).message === "SetState" ||
          (results as any).message === "Merge") && (
          <CodeComparison
            items={[
              {
                label: "Message",
                code:
                  (results as any).message === "Assign"
                    ? `await client.api('/Assign').post({
  Target: { '@odata.type': 'Microsoft.Dynamics.CRM.account', accountid: '${targetEntityId}' },
  Assignee: { '@odata.type': 'Microsoft.Dynamics.CRM.systemuser', systemuserid: '${assigneeId}' }
})`
                    : (results as any).message === "SetState"
                      ? `await client.api('/SetState').post({
  EntityMoniker: { '@odata.type': 'Microsoft.Dynamics.CRM.account', accountid: '${targetEntityId}' },
  State: ${stateCode},
  Status: ${statusCode}
})`
                      : `await client.api('/Merge').post({
  Target: { '@odata.type': 'Microsoft.Dynamics.CRM.account', accountid: 'target-guid' },
  SubordinateId: 'subordinate-guid',
  UpdateContent: { name: 'Merged Account Name' },
  PerformParentingChecks: false
})`,
                result: (JSON as any).stringify(results, null, 2),
              },
            ]}
          />
        )}
    </div>
  );

  const renderSolutionTab = () => (
    <div>
      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Export Solution</Title3>
        <Text>Export solution as base64 zip file</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Solution Name</Label>
            <Input
              value={solutionName}
              onChange={(_e, data) => setSolutionName((data as any).value)}
              placeholder="MySolution"
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<CloudArrowDownRegular />}
            onClick={handleExportSolution}
            disabled={!solutionName}
          >
            Export Solution
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Import Solution</Title3>
        <Text>Import solution from base64 zip file</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Solution File (Base64)</Label>
            <Textarea
              value={solutionXml}
              onChange={(_e, data) => setSolutionXml((data as any).value)}
              placeholder="Paste base64 encoded solution zip..."
              rows={4}
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button
            appearance="primary"
            icon={<CloudArrowUpRegular />}
            onClick={handleImportSolution}
            disabled={!solutionXml}
          >
            Import Solution
          </Button>
        </div>
      </Card>

      <Card style={{ padding: "24px", marginBottom: "24px" }}>
        <Title3>Publish Customizations</Title3>
        <Text>Publish specific entities or all customizations</Text>

        <div className={(styles as any).form}>
          <div>
            <Label>Publish XML</Label>
            <Textarea
              value={publishXml}
              onChange={(_e, data) => setPublishXml((data as any).value)}
              rows={4}
            />
          </div>
        </div>

        <div className={(styles as any).actions}>
          <Button appearance="primary" onClick={handlePublishXml}>
            PublishXml
          </Button>
          <Button onClick={handlePublishAllXml}>PublishAllXml</Button>
        </div>
      </Card>

      {results &&
        (results as any).message &&
        ((results as any).message.includes("Solution") ||
          (results as any).message.includes("Publish")) && (
          <CodeComparison
            items={[
              {
                label: "Message",
                code:
                  (results as any).message === "ExportSolution"
                    ? `const response = await client.api('/ExportSolution').post({
  SolutionName: '${solutionName}',
  Managed: false,
  // ... other settings
});
// response.ExportSolutionFile contains base64 zip`
                    : (results as any).message === "ImportSolution"
                      ? `const response = await client.api('/ImportSolution').post({
  CustomizationFile: base64Zip,
  PublishWorkflows: true,
  // ... other settings
});
// response.importjobid for tracking`
                      : `await client.api('/${(results as any).message}').post({
  ParameterXml: '${(publishXml as any).substring(0, 50)}...'
})`,
                result: (JSON as any).stringify(results, null, 2),
              },
            ]}
          />
        )}
    </div>
  );

  const renderSpecializedTab = () => (
    <div>
      <Card style={{ padding: "24px" }}>
        <Title3>Specialized SDK Messages</Title3>
        <Text>Additional messages for advanced scenarios</Text>

        <div style={{ marginTop: "16px" }}>
          <Text weight="semibold">Available Messages:</Text>
          <ul>
            <li>WhoAmI - Get current user info</li>
            <li>Assign - Reassign record ownership</li>
            <li>SetState - Change record state/status</li>
            <li>Merge - Combine duplicate records</li>
            <li>ExecuteWorkflow - Trigger workflows</li>
            <li>ExportSolution / ImportSolution - Solution management</li>
            <li>PublishXml / PublishAllXml - Publish customizations</li>
            <li>GrantAccess / RevokeAccess - Security operations</li>
            <li>RetrieveMetadataChanges - Delta metadata queries</li>
          </ul>
        </div>

        <Text style={{ marginTop: "16px" }}>
          All 1000+ SDK messages are supported. Check the SDK documentation for the complete list.
        </Text>
      </Card>
    </div>
  );

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>SDK Messages</Title3>
        <Text className={(styles as any).description}>
          Execute typed SDK messages including solution management and business operations
        </Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab((data as any).value as TabValue)}
        className={(styles as any).tabs}
      >
        <Tab value="common" icon={<BoxMultipleRegular />}>
          Common Messages
        </Tab>
        <Tab value="solution" icon={<CloudArrowUpRegular />}>
          Solution Management
        </Tab>
        <Tab value="specialized" icon={<BoxMultipleRegular />}>
          Specialized
        </Tab>
      </TabList>

      <div className={(styles as any).content}>
        {loading && <LoadingState label="Executing message..." />}
        {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

        {!loading && selectedTab === "common" && renderCommonTab()}
        {!loading && selectedTab === "solution" && renderSolutionTab()}
        {!loading && selectedTab === "specialized" && renderSpecializedTab()}
      </div>
    </div>
  );
}
