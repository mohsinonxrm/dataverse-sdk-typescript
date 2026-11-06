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
  const [results, setResults] = useState<ResultView | null>(null);

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
      // contact_customer_accounts is the collection-valued side of the relationship, so it is
      // navigated from the account; the builder posts the absolute @odata.id to .../$ref.
      await client
        .api(`/accounts(${accountId})`)
        .associate("contact_customer_accounts", "contacts", contactId);

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
      // associate(entitySetName, id, relationship, relatedEntities): the primary record is the
      // account that owns the collection-valued navigation property.
      await orgService.associate("accounts", accountId, relationship, [
        { logicalName: "contact", id: contactId },
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
      // disassociate(entitySetName, id, relationship, relatedId): relatedId is a single GUID.
      await orgService.disassociate("accounts", accountId, relationship, contactId);

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
      const response = await client.api("/contacts").post<JsonObject>({
        firstname: "Jane",
        lastname: "Doe",
        "parentcustomerid_account@odata.bind": `/accounts(${accountId})`,
      });

      setResults({
        operation: "Create with Bind",
        contactCreated: response.contactid,
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
        .get<PageResponse<JsonObject>>();

      setResults({
        operation: "Retrieve Related",
        accountId,
        relatedContacts: response.value,
        count: response.value.length,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Relationship Operations</Title3>
        <Text className={styles.description}>
          Associate, disassociate, and bind records using N:N and 1:N relationships
        </Text>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Title3>Associate Records</Title3>
          <Text>Link records through N:N relationships</Text>

          <div className={styles.form}>
            <div>
              <Label>Contact ID</Label>
              <Input
                value={contactId}
                onChange={(_e, data) => setContactId(data.value)}
                placeholder="GUID of contact"
              />
            </div>
            <div>
              <Label>Account ID</Label>
              <Input
                value={accountId}
                onChange={(_e, data) => setAccountId(data.value)}
                placeholder="GUID of account"
              />
            </div>
            <div>
              <Label>Relationship Name</Label>
              <Dropdown
                value={relationship}
                selectedOptions={[relationship]}
                onOptionSelect={(_e, data) => setRelationship(data.optionValue as string)}
              >
                <Option value="contact_customer_accounts">contact_customer_accounts (N:N)</Option>
                <Option value="account_primary_contact">account_primary_contact (1:N)</Option>
              </Dropdown>
            </div>
          </div>

          <div className={styles.actions}>
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

        <Card className={styles.card}>
          <Title3>Disassociate Records</Title3>
          <Text>Remove links between records</Text>

          <div className={styles.form}>
            <Text size={200}>Uses same IDs and relationship from Associate section</Text>
          </div>

          <div className={styles.actions}>
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

        <Card className={styles.card}>
          <Title3>Create with Bind</Title3>
          <Text>Create and link in a single request (1:N only)</Text>

          <div className={styles.form}>
            <Text size={200}>Creates new contact and binds to account</Text>
          </div>

          <div className={styles.actions}>
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

        <Card className={styles.card}>
          <Title3>Retrieve Related</Title3>
          <Text>Get related records through navigation properties</Text>

          <div className={styles.form}>
            <Text size={200}>Retrieves all contacts related to account</Text>
          </div>

          <div className={styles.actions}>
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
                results.operation === "Associate (Raw API)"
                  ? `await client
  .api('/accounts(${accountId})')
  .associate('contact_customer_accounts', 'contacts', '${contactId}')`
                  : results.operation === "Associate (OrgService)"
                    ? `await orgService.associate('accounts', '${accountId}', '${relationship}', [
  { logicalName: 'contact', id: '${contactId}' }
])`
                    : results.operation === "Disassociate"
                      ? `await orgService.disassociate('accounts', '${accountId}', '${relationship}', '${contactId}')`
                      : results.operation === "Create with Bind"
                        ? `await client.api('/contacts').post({
  firstname: 'Jane',
  lastname: 'Doe',
  'parentcustomerid_account@odata.bind': '/accounts(${accountId})'
})`
                        : `await client.api('/accounts(${accountId})/${relationship}')
  .select()
  .get()`,
              result: JSON.stringify(results, null, 2),
            },
          ]}
        />
      )}
    </div>
  );
}
