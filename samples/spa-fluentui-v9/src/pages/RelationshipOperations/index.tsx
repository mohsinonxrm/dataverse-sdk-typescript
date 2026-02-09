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
} from "@fluentui/react-components";
import { LinkRegular, LinkDismissRegular, DatabaseLinkRegular } from "@fluentui/react-icons";
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },
  card: {
    padding: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
});

export default function RelationshipOperations() {
  const styles = useStyles();
  const { client, orgService, isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<any>(null);

  // Associate state
  const [contactId, setContactId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [relationship, setRelationship] = useState("contact_customer_accounts");

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleAssociateRaw = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Associate using raw API
      await (client as any).api(`/contacts(${contactId})/contact_customer_accounts/$ref`).post({
        "@(odata as any).id": `${client["baseUrl"]}/accounts(${accountId})`,
      });

      setResults({
        operation: "Associate (Raw API)",
        contactId,
        accountId,
        relationship,
        status: "Success (204 No Content)",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssociateOrgService = async () => {
    if (!orgService) return;
    setLoading(true);
    setError(null);

    try {
      // Associate using OrganizationService
      await (orgService as any).associate("contact", contactId, relationship, [
        { entityType: "account", id: accountId },
      ]);

      setResults({
        operation: "Associate (OrgService)",
        contactId,
        accountId,
        relationship,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisassociate = async () => {
    if (!orgService) return;
    setLoading(true);
    setError(null);

    try {
      // Disassociate using OrganizationService
      await (orgService as any).disassociate("contact", contactId, relationship, [
        { entityType: "account", id: accountId },
      ]);

      setResults({
        operation: "Disassociate",
        contactId,
        accountId,
        relationship,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWithBind = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Create contact and bind to account in single request
      const response = await (client as any).api("/contacts").post({
        firstname: "Jane",
        lastname: "Doe",
        "parentcustomerid_account@(odata as any).bind": `/accounts(${accountId})`,
      });

      setResults({
        operation: "Create with Bind",
        contactCreated: (response as any).contactid,
        boundTo: accountId,
        status: "Success",
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrieveRelated = async () => {
    if (!client) return;
    setLoading(true);
    setError(null);

    try {
      // Retrieve related records
      const response = await client
        .api(`/accounts(${accountId})/contact_customer_accounts`)
        .select()
        .get();

      setResults({
        operation: "Retrieve Related",
        accountId,
        relatedContacts: (response as any).value,
        count: (response as any).value?.length || 0,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Relationship Operations</Title3>
        <Text className={(styles as any).description}>
          Associate, disassociate, and bind records using N:N and 1:N relationships
        </Text>
      </div>

      <div className={(styles as any).grid}>
        <Card className={(styles as any).card}>
          <Title3>Associate Records</Title3>
          <Text>Link records through N:N relationships</Text>

          <div className={(styles as any).form}>
            <div>
              <Label>Contact ID</Label>
              <Input
                value={contactId}
                onChange={(_e, data) => setContactId((data as any).value)}
                placeholder="GUID of contact"
              />
            </div>
            <div>
              <Label>Account ID</Label>
              <Input
                value={accountId}
                onChange={(_e, data) => setAccountId((data as any).value)}
                placeholder="GUID of account"
              />
            </div>
            <div>
              <Label>Relationship Name</Label>
              <Dropdown
                value={relationship}
                selectedOptions={[relationship]}
                onOptionSelect={(_e, data) => setRelationship((data as any).optionValue as string)}
              >
                <Option value="contact_customer_accounts">contact_customer_accounts (N:N)</Option>
                <Option value="account_primary_contact">account_primary_contact (1:N)</Option>
              </Dropdown>
            </div>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<LinkRegular />}
              onClick={handleAssociateRaw}
              disabled={loading || !contactId || !accountId}
            >
              Associate (Raw)
            </Button>
            <Button
              icon={<LinkRegular />}
              onClick={handleAssociateOrgService}
              disabled={loading || !contactId || !accountId}
            >
              Associate (OrgService)
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Disassociate Records</Title3>
          <Text>Remove links between records</Text>

          <div className={(styles as any).form}>
            <Text size={200}>Uses same IDs and relationship from Associate section</Text>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<LinkDismissRegular />}
              onClick={handleDisassociate}
              disabled={loading || !contactId || !accountId}
            >
              Disassociate
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Create with Bind</Title3>
          <Text>Create and link in a single request (1:N only)</Text>

          <div className={(styles as any).form}>
            <Text size={200}>Creates new contact and binds to account</Text>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              icon={<DatabaseLinkRegular />}
              onClick={handleCreateWithBind}
              disabled={loading || !accountId}
            >
              Create Contact + Bind
            </Button>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Retrieve Related</Title3>
          <Text>Get related records through navigation properties</Text>

          <div className={(styles as any).form}>
            <Text size={200}>Retrieves all contacts related to account</Text>
          </div>

          <div className={(styles as any).actions}>
            <Button
              appearance="primary"
              onClick={handleRetrieveRelated}
              disabled={loading || !accountId}
            >
              Get Related Contacts
            </Button>
          </div>
        </Card>
      </div>

      {loading && <LoadingState label="Processing relationship operation..." />}

      {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}

      {results && (
        <CodeComparison
          items={[
            {
              label: "Operation",
              code:
                (results as any).operation === "Associate (Raw API)"
                  ? `await (client as any).api('/contacts(${contactId})/${relationship}/$ref').post({
  '@(odata as any).id': '/accounts(${accountId})'
})`
                  : (results as any).operation === "Associate (OrgService)"
                    ? `await (orgService as any).associate('contact', '${contactId}', '${relationship}', [
  { entityType: 'account', id: '${accountId}' }
])`
                    : (results as any).operation === "Disassociate"
                      ? `await (orgService as any).disassociate('contact', '${contactId}', '${relationship}', [
  { entityType: 'account', id: '${accountId}' }
])`
                      : (results as any).operation === "Create with Bind"
                        ? `await (client as any).api('/contacts').post({
  firstname: 'Jane',
  lastname: 'Doe',
  'parentcustomerid_account@(odata as any).bind': '/accounts(${accountId})'
})`
                        : `await (client as any).api('/accounts(${accountId})/${relationship}')
  .select()
  .get()`,
              result: (JSON as any).stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );
}
