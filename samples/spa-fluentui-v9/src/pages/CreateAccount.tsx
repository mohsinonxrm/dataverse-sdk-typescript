import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Title1,
  Body1,
  Card,
  Button,
  Input,
  Field,
  Spinner,
} from "@fluentui/react-components";
import { SaveRegular, DismissRegular } from "@fluentui/react-icons";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { dataverseUrl, loginRequest } from "../config";
import type { CreateAccountInput } from "../types/Account";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  card: {
    maxWidth: "800px",
    padding: "32px",
  },
  form: {
    display: "grid",
    gap: "24px",
    marginTop: "24px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "32px",
  },
});

export default function CreateAccount() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CreateAccountInput>({
    name: "",
  });

  const handleChange = (field: keyof CreateAccountInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Account name is required");
      return;
    }

    try {
      setSaving(true);

      const tokenProvider = new MsalBrowserTokenProvider(instance, {
        account: accounts[0],
        scopes: loginRequest.scopes,
      });

      const client = new DataverseClient({
        baseUrl: dataverseUrl,
        apiVersion: "v9.2",
        tokenProvider,
      });

      const payload: CreateAccountInput = { name: formData.name };
      if (formData.accountnumber) payload.accountnumber = formData.accountnumber;
      if (formData.telephone1) payload.telephone1 = formData.telephone1;
      if (formData.emailaddress1) payload.emailaddress1 = formData.emailaddress1;
      if (formData.revenue) payload.revenue = Number(formData.revenue);
      if (formData.numberofemployees)
        payload.numberofemployees = Number(formData.numberofemployees);
      if (formData.websiteurl) payload.websiteurl = formData.websiteurl;
      if (formData.address1_city) payload.address1_city = formData.address1_city;
      if (formData.address1_stateorprovince)
        payload.address1_stateorprovince = formData.address1_stateorprovince;
      if (formData.address1_country) payload.address1_country = formData.address1_country;
      if (formData.description) payload.description = formData.description;

      const response = await client.api("/accounts").post<{ accountid: string }>(payload);

      navigate(`/accounts/${response.accountid}`);
    } catch (error) {
      console.error("Failed to create account:", error);
      alert("Failed to create account");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title1>Create New Account</Title1>
        <Body1 style={{ marginTop: "8px", color: tokens.colorNeutralForeground3 }}>
          Fill in the details below to create a new account
        </Body1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Field label="Account Name *" required>
            <Input
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter account name"
            />
          </Field>

          <div className={styles.row}>
            <Field label="Account Number">
              <Input
                value={formData.accountnumber || ""}
                onChange={(e) => handleChange("accountnumber", e.target.value)}
                placeholder="e.g. ACC-001"
              />
            </Field>

            <Field label="Phone">
              <Input
                value={formData.telephone1 || ""}
                onChange={(e) => handleChange("telephone1", e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
                type="tel"
              />
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="Email">
              <Input
                value={formData.emailaddress1 || ""}
                onChange={(e) => handleChange("emailaddress1", e.target.value)}
                placeholder="e.g. contact@example.com"
                type="email"
              />
            </Field>

            <Field label="Website">
              <Input
                value={formData.websiteurl || ""}
                onChange={(e) => handleChange("websiteurl", e.target.value)}
                placeholder="e.g. https://example.com"
                type="url"
              />
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="Revenue (USD)">
              <Input
                value={formData.revenue?.toString() || ""}
                onChange={(e) => handleChange("revenue", e.target.value)}
                placeholder="e.g. 1000000"
                type="number"
              />
            </Field>

            <Field label="Number of Employees">
              <Input
                value={formData.numberofemployees?.toString() || ""}
                onChange={(e) => handleChange("numberofemployees", e.target.value)}
                placeholder="e.g. 100"
                type="number"
              />
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="City">
              <Input
                value={formData.address1_city || ""}
                onChange={(e) => handleChange("address1_city", e.target.value)}
                placeholder="e.g. Seattle"
              />
            </Field>

            <Field label="State/Province">
              <Input
                value={formData.address1_stateorprovince || ""}
                onChange={(e) => handleChange("address1_stateorprovince", e.target.value)}
                placeholder="e.g. WA"
              />
            </Field>
          </div>

          <Field label="Country">
            <Input
              value={formData.address1_country || ""}
              onChange={(e) => handleChange("address1_country", e.target.value)}
              placeholder="e.g. USA"
            />
          </Field>

          <Field label="Description">
            <Input
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter account description"
            />
          </Field>

          <div className={styles.actions}>
            <Button appearance="primary" icon={<SaveRegular />} type="submit" disabled={saving}>
              {saving ? <Spinner size="tiny" /> : "Create Account"}
            </Button>
            <Button
              icon={<DismissRegular />}
              onClick={() => navigate("/accounts")}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
