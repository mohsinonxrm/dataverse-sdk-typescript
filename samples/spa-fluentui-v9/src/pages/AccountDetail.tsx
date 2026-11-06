import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useParams, useNavigate } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Body1,
  Card,
  Button,
  Input,
  Field,
  Spinner,
} from "@fluentui/react-components";
import {
  SaveRegular,
  DeleteRegular,
  DismissRegular,
  EditRegular,
  BuildingRegular,
  PhoneRegular,
  MailRegular,
  GlobeRegular,
  MoneyRegular,
  PeopleRegular,
  LocationRegular,
} from "@fluentui/react-icons";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { dataverseUrl, loginRequest } from "../config";
import type { Account, UpdateAccountInput } from "../types/Account";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  headerInfo: {
    flex: 1,
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "2fr 1fr",
  },
  card: {
    padding: "24px",
  },
  form: {
    display: "grid",
    gap: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  infoGrid: {
    display: "grid",
    gap: "16px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  infoIcon: {
    fontSize: "20px",
    color: tokens.colorBrandForeground1,
  },
});

export default function AccountDetail() {
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [account, setAccount] = useState<Account | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<DataverseClient | null>(null);
  const [formData, setFormData] = useState<UpdateAccountInput>({ accountid: id! });

  useEffect(() => {
    void initializeClient();
  }, []);

  const initializeClient = async () => {
    const tokenProvider = new MsalBrowserTokenProvider(instance, {
      account: accounts[0],
      scopes: loginRequest.scopes,
    });

    const dataverseClient = new DataverseClient({
      baseUrl: dataverseUrl,
      apiVersion: "v9.2",
      tokenProvider,
    });

    setClient(dataverseClient);
    await loadAccount(dataverseClient);
  };

  const loadAccount = async (dataverseClient: DataverseClient) => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await dataverseClient
        .api(`/accounts(${id})`)
        .select(
          "accountid",
          "name",
          "accountnumber",
          "telephone1",
          "emailaddress1",
          "revenue",
          "numberofemployees",
          "websiteurl",
          "address1_city",
          "address1_stateorprovince",
          "address1_country",
          "description",
          "createdon",
          "modifiedon",
          "@odata.etag"
        )
        .get<Account>();

      setAccount(response);
      setFormData({
        accountid: id,
        name: response.name,
        accountnumber: response.accountnumber,
        telephone1: response.telephone1,
        emailaddress1: response.emailaddress1,
        revenue: response.revenue,
        numberofemployees: response.numberofemployees,
        websiteurl: response.websiteurl,
        address1_city: response.address1_city,
        address1_stateorprovince: response.address1_stateorprovince,
        address1_country: response.address1_country,
        description: response.description,
      });
    } catch (error) {
      console.error("Failed to load account:", error);
      alert("Failed to load account");
      navigate("/accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!client || !account) return;

    try {
      setSaving(true);

      const payload: Partial<UpdateAccountInput> = {};
      if (formData.name) payload.name = formData.name;
      if (formData.accountnumber !== undefined) payload.accountnumber = formData.accountnumber;
      if (formData.telephone1 !== undefined) payload.telephone1 = formData.telephone1;
      if (formData.emailaddress1 !== undefined) payload.emailaddress1 = formData.emailaddress1;
      if (formData.revenue !== undefined) payload.revenue = Number(formData.revenue);
      if (formData.numberofemployees !== undefined)
        payload.numberofemployees = Number(formData.numberofemployees);
      if (formData.websiteurl !== undefined) payload.websiteurl = formData.websiteurl;
      if (formData.address1_city !== undefined) payload.address1_city = formData.address1_city;
      if (formData.address1_stateorprovince !== undefined)
        payload.address1_stateorprovince = formData.address1_stateorprovince;
      if (formData.address1_country !== undefined)
        payload.address1_country = formData.address1_country;
      if (formData.description !== undefined) payload.description = formData.description;

      await client.api(`/accounts(${id})`).patch(payload);

      setEditing(false);
      await loadAccount(client);
    } catch (error) {
      console.error("Failed to update account:", error);
      alert("Failed to update account");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!client || !account) return;

    if (confirm(`Are you sure you want to delete "${account.name}"?`)) {
      try {
        await client.api(`/accounts(${id})`).delete();
        navigate("/accounts");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete account");
      }
    }
  };

  const handleChange = (field: keyof UpdateAccountInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="large" label="Loading account..." />
      </div>
    );
  }

  if (!account) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Title1>{account.name}</Title1>
          <Body1 style={{ marginTop: "8px", color: tokens.colorNeutralForeground3 }}>
            Account ID: {account.accountid}
          </Body1>
        </div>
        <div className={styles.actions}>
          {!editing ? (
            <>
              <Button appearance="primary" icon={<EditRegular />} onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button appearance="subtle" icon={<DeleteRegular />} onClick={handleDelete}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                appearance="primary"
                icon={<SaveRegular />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Spinner size="tiny" /> : "Save"}
              </Button>
              <Button
                icon={<DismissRegular />}
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    accountid: id!,
                    name: account.name,
                    accountnumber: account.accountnumber,
                    telephone1: account.telephone1,
                    emailaddress1: account.emailaddress1,
                    revenue: account.revenue,
                    numberofemployees: account.numberofemployees,
                    websiteurl: account.websiteurl,
                    address1_city: account.address1_city,
                    address1_stateorprovince: account.address1_stateorprovince,
                    address1_country: account.address1_country,
                    description: account.description,
                  });
                }}
                disabled={saving}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Title2 style={{ marginBottom: "20px" }}>Account Details</Title2>

          {editing ? (
            <div className={styles.form}>
              <Field label="Account Name *">
                <Input
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Field>

              <div className={styles.row}>
                <Field label="Account Number">
                  <Input
                    value={formData.accountnumber || ""}
                    onChange={(e) => handleChange("accountnumber", e.target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={formData.telephone1 || ""}
                    onChange={(e) => handleChange("telephone1", e.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.row}>
                <Field label="Email">
                  <Input
                    value={formData.emailaddress1 || ""}
                    onChange={(e) => handleChange("emailaddress1", e.target.value)}
                  />
                </Field>
                <Field label="Website">
                  <Input
                    value={formData.websiteurl || ""}
                    onChange={(e) => handleChange("websiteurl", e.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.row}>
                <Field label="Revenue">
                  <Input
                    value={formData.revenue?.toString() || ""}
                    onChange={(e) => handleChange("revenue", e.target.value)}
                    type="number"
                  />
                </Field>
                <Field label="Employees">
                  <Input
                    value={formData.numberofemployees?.toString() || ""}
                    onChange={(e) => handleChange("numberofemployees", e.target.value)}
                    type="number"
                  />
                </Field>
              </div>

              <div className={styles.row}>
                <Field label="City">
                  <Input
                    value={formData.address1_city || ""}
                    onChange={(e) => handleChange("address1_city", e.target.value)}
                  />
                </Field>
                <Field label="State/Province">
                  <Input
                    value={formData.address1_stateorprovince || ""}
                    onChange={(e) => handleChange("address1_stateorprovince", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Country">
                <Input
                  value={formData.address1_country || ""}
                  onChange={(e) => handleChange("address1_country", e.target.value)}
                />
              </Field>

              <Field label="Description">
                <Input
                  value={formData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Field>
            </div>
          ) : (
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <BuildingRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Account Number</Body1>
                  <Body1>{account.accountnumber || "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <PhoneRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Phone</Body1>
                  <Body1>{account.telephone1 || "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <MailRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Email</Body1>
                  <Body1>{account.emailaddress1 || "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <GlobeRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Website</Body1>
                  <Body1>{account.websiteurl || "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <MoneyRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Revenue</Body1>
                  <Body1>{account.revenue ? `$${account.revenue.toLocaleString()}` : "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <PeopleRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Employees</Body1>
                  <Body1>{account.numberofemployees || "—"}</Body1>
                </div>
              </div>

              <div className={styles.infoItem}>
                <LocationRegular className={styles.infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Location</Body1>
                  <Body1>
                    {[
                      account.address1_city,
                      account.address1_stateorprovince,
                      account.address1_country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </Body1>
                </div>
              </div>

              {account.description && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: tokens.colorNeutralBackground2,
                    borderRadius: tokens.borderRadiusMedium,
                  }}
                >
                  <Body1 style={{ fontWeight: 600, marginBottom: "8px" }}>Description</Body1>
                  <Body1>{account.description}</Body1>
                </div>
              )}
            </div>
          )}
        </Card>

        <div style={{ display: "grid", gap: "24px" }}>
          <Card className={styles.card}>
            <Title2 style={{ marginBottom: "16px" }}>Metadata</Title2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <Body1 style={{ fontWeight: 600 }}>Created</Body1>
                <Body1>
                  {account.createdon ? new Date(account.createdon).toLocaleString() : "—"}
                </Body1>
              </div>
              <div>
                <Body1 style={{ fontWeight: 600 }}>Modified</Body1>
                <Body1>
                  {account.modifiedon ? new Date(account.modifiedon).toLocaleString() : "—"}
                </Body1>
              </div>
              <div>
                <Body1 style={{ fontWeight: 600 }}>ETag</Body1>
                <Body1 style={{ fontSize: "12px", wordBreak: "break-all" }}>
                  {account["@odata.etag"] || "—"}
                </Body1>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
