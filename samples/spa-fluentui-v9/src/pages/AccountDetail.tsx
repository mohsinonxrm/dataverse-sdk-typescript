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
    backgroundColor: (tokens as any).colorNeutralBackground3,
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
    backgroundColor: (tokens as any).colorNeutralBackground2,
    borderRadius: (tokens as any).borderRadiusMedium,
  },
  infoIcon: {
    fontSize: "20px",
    color: (tokens as any).colorBrandForeground1,
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
    initializeClient();
  }, []);

  const initializeClient = async () => {
    const tokenProvider = new MsalBrowserTokenProvider(instance, {
      account: accounts[0],
      scopes: (loginRequest as any).scopes,
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
        name: (response as any).name,
        accountnumber: (response as any).accountnumber,
        telephone1: (response as any).telephone1,
        emailaddress1: (response as any).emailaddress1,
        revenue: (response as any).revenue,
        numberofemployees: (response as any).numberofemployees,
        websiteurl: (response as any).websiteurl,
        address1_city: (response as any).address1_city,
        address1_stateorprovince: (response as any).address1_stateorprovince,
        address1_country: (response as any).address1_country,
        description: (response as any).description,
      });
    } catch (error) {
      (console as any).error("Failed to load account:", error);
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

      const payload: any = {};
      if ((formData as any).name) (payload as any).name = (formData as any).name;
      if ((formData as any).accountnumber !== undefined)
        (payload as any).accountnumber = (formData as any).accountnumber;
      if ((formData as any).telephone1 !== undefined)
        (payload as any).telephone1 = (formData as any).telephone1;
      if ((formData as any).emailaddress1 !== undefined)
        (payload as any).emailaddress1 = (formData as any).emailaddress1;
      if ((formData as any).revenue !== undefined)
        (payload as any).revenue = Number((formData as any).revenue);
      if ((formData as any).numberofemployees !== undefined)
        (payload as any).numberofemployees = Number((formData as any).numberofemployees);
      if ((formData as any).websiteurl !== undefined)
        (payload as any).websiteurl = (formData as any).websiteurl;
      if ((formData as any).address1_city !== undefined)
        (payload as any).address1_city = (formData as any).address1_city;
      if ((formData as any).address1_stateorprovince !== undefined)
        (payload as any).address1_stateorprovince = (formData as any).address1_stateorprovince;
      if ((formData as any).address1_country !== undefined)
        (payload as any).address1_country = (formData as any).address1_country;
      if ((formData as any).description !== undefined)
        (payload as any).description = (formData as any).description;

      await (client as any).api(`/accounts(${id})`).patch(payload);

      setEditing(false);
      await loadAccount(client);
    } catch (error) {
      (console as any).error("Failed to update account:", error);
      alert("Failed to update account");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!client || !account) return;

    if (confirm(`Are you sure you want to delete "${(account as any).name}"?`)) {
      try {
        await (client as any).api(`/accounts(${id})`).delete();
        navigate("/accounts");
      } catch (error) {
        (console as any).error("Delete failed:", error);
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
        className={(styles as any).container}
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
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <div className={(styles as any).headerInfo}>
          <Title1>{(account as any).name}</Title1>
          <Body1 style={{ marginTop: "8px", color: (tokens as any).colorNeutralForeground3 }}>
            Account ID: {(account as any).accountid}
          </Body1>
        </div>
        <div className={(styles as any).actions}>
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
                    name: (account as any).name,
                    accountnumber: (account as any).accountnumber,
                    telephone1: (account as any).telephone1,
                    emailaddress1: (account as any).emailaddress1,
                    revenue: (account as any).revenue,
                    numberofemployees: (account as any).numberofemployees,
                    websiteurl: (account as any).websiteurl,
                    address1_city: (account as any).address1_city,
                    address1_stateorprovince: (account as any).address1_stateorprovince,
                    address1_country: (account as any).address1_country,
                    description: (account as any).description,
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

      <div className={(styles as any).grid}>
        <Card className={(styles as any).card}>
          <Title2 style={{ marginBottom: "20px" }}>Account Details</Title2>

          {editing ? (
            <div className={(styles as any).form}>
              <Field label="Account Name *">
                <Input
                  value={(formData as any).name || ""}
                  onChange={(e) => handleChange("name", (e as any).target.value)}
                />
              </Field>

              <div className={(styles as any).row}>
                <Field label="Account Number">
                  <Input
                    value={(formData as any).accountnumber || ""}
                    onChange={(e) => handleChange("accountnumber", (e as any).target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={(formData as any).telephone1 || ""}
                    onChange={(e) => handleChange("telephone1", (e as any).target.value)}
                  />
                </Field>
              </div>

              <div className={(styles as any).row}>
                <Field label="Email">
                  <Input
                    value={(formData as any).emailaddress1 || ""}
                    onChange={(e) => handleChange("emailaddress1", (e as any).target.value)}
                  />
                </Field>
                <Field label="Website">
                  <Input
                    value={(formData as any).websiteurl || ""}
                    onChange={(e) => handleChange("websiteurl", (e as any).target.value)}
                  />
                </Field>
              </div>

              <div className={(styles as any).row}>
                <Field label="Revenue">
                  <Input
                    value={(formData as any).revenue?.toString() || ""}
                    onChange={(e) => handleChange("revenue", (e as any).target.value)}
                    type="number"
                  />
                </Field>
                <Field label="Employees">
                  <Input
                    value={(formData as any).numberofemployees?.toString() || ""}
                    onChange={(e) => handleChange("numberofemployees", (e as any).target.value)}
                    type="number"
                  />
                </Field>
              </div>

              <div className={(styles as any).row}>
                <Field label="City">
                  <Input
                    value={(formData as any).address1_city || ""}
                    onChange={(e) => handleChange("address1_city", (e as any).target.value)}
                  />
                </Field>
                <Field label="State/Province">
                  <Input
                    value={(formData as any).address1_stateorprovince || ""}
                    onChange={(e) =>
                      handleChange("address1_stateorprovince", (e as any).target.value)
                    }
                  />
                </Field>
              </div>

              <Field label="Country">
                <Input
                  value={(formData as any).address1_country || ""}
                  onChange={(e) => handleChange("address1_country", (e as any).target.value)}
                />
              </Field>

              <Field label="Description">
                <Input
                  value={(formData as any).description || ""}
                  onChange={(e) => handleChange("description", (e as any).target.value)}
                />
              </Field>
            </div>
          ) : (
            <div className={(styles as any).infoGrid}>
              <div className={(styles as any).infoItem}>
                <BuildingRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Account Number</Body1>
                  <Body1>{(account as any).accountnumber || "—"}</Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <PhoneRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Phone</Body1>
                  <Body1>{(account as any).telephone1 || "—"}</Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <MailRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Email</Body1>
                  <Body1>{(account as any).emailaddress1 || "—"}</Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <GlobeRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Website</Body1>
                  <Body1>{(account as any).websiteurl || "—"}</Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <MoneyRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Revenue</Body1>
                  <Body1>
                    {(account as any).revenue
                      ? `$${(account as any).revenue.toLocaleString()}`
                      : "—"}
                  </Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <PeopleRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Employees</Body1>
                  <Body1>{(account as any).numberofemployees || "—"}</Body1>
                </div>
              </div>

              <div className={(styles as any).infoItem}>
                <LocationRegular className={(styles as any).infoIcon} />
                <div>
                  <Body1 style={{ fontWeight: 600 }}>Location</Body1>
                  <Body1>
                    {[
                      (account as any).address1_city,
                      (account as any).address1_stateorprovince,
                      (account as any).address1_country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </Body1>
                </div>
              </div>

              {(account as any).description && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: (tokens as any).colorNeutralBackground2,
                    borderRadius: (tokens as any).borderRadiusMedium,
                  }}
                >
                  <Body1 style={{ fontWeight: 600, marginBottom: "8px" }}>Description</Body1>
                  <Body1>{(account as any).description}</Body1>
                </div>
              )}
            </div>
          )}
        </Card>

        <div style={{ display: "grid", gap: "24px" }}>
          <Card className={(styles as any).card}>
            <Title2 style={{ marginBottom: "16px" }}>Metadata</Title2>
            <div style={{ display: "grid", gap: "12px" }}>
              <div>
                <Body1 style={{ fontWeight: 600 }}>Created</Body1>
                <Body1>
                  {(account as any).createdon
                    ? new Date((account as any).createdon).toLocaleString()
                    : "—"}
                </Body1>
              </div>
              <div>
                <Body1 style={{ fontWeight: 600 }}>Modified</Body1>
                <Body1>
                  {(account as any).modifiedon
                    ? new Date((account as any).modifiedon).toLocaleString()
                    : "—"}
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
