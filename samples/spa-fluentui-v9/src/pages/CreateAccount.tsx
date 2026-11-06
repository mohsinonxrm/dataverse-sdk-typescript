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
import type { Account } from "../types/Account";
import type { CreateAccountInput } from "../types/Account";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "32px",
    backgroundColor: (tokens as any).colorNeutralBackground3,
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
        scopes: (loginRequest as any).scopes,
      });

      const client = new DataverseClient({
        baseUrl: dataverseUrl,
        apiVersion: "v9.2",
        tokenProvider,
      });

      const payload: any = { name: (formData as any).name };
      if ((formData as any).accountnumber)
        (payload as any).accountnumber = (formData as any).accountnumber;
      if ((formData as any).telephone1) (payload as any).telephone1 = (formData as any).telephone1;
      if ((formData as any).emailaddress1)
        (payload as any).emailaddress1 = (formData as any).emailaddress1;
      if ((formData as any).revenue) (payload as any).revenue = Number((formData as any).revenue);
      if ((formData as any).numberofemployees)
        (payload as any).numberofemployees = Number((formData as any).numberofemployees);
      if ((formData as any).websiteurl) (payload as any).websiteurl = (formData as any).websiteurl;
      if ((formData as any).address1_city)
        (payload as any).address1_city = (formData as any).address1_city;
      if ((formData as any).address1_stateorprovince)
        (payload as any).address1_stateorprovince = (formData as any).address1_stateorprovince;
      if ((formData as any).address1_country)
        (payload as any).address1_country = (formData as any).address1_country;
      if ((formData as any).description)
        (payload as any).description = (formData as any).description;

      const response = await client.api("/accounts").post(payload);

      navigate(`/accounts/${(response as any).accountid}`);
    } catch (error) {
      (console as any).error("Failed to create account:", error);
      alert("Failed to create account");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={(styles as any).container}>
      <Card className={(styles as any).card}>
        <Title1>Create New Account</Title1>
        <Body1 style={{ marginTop: "8px", color: (tokens as any).colorNeutralForeground3 }}>
          Fill in the details below to create a new account
        </Body1>

        <form onSubmit={handleSubmit} className={(styles as any).form}>
          <Field label="Account Name *" required>
            <Input
              value={(formData as any).name}
              onChange={(e) => handleChange("name", (e as any).target.value)}
              placeholder="Enter account name"
            />
          </Field>

          <div className={(styles as any).row}>
            <Field label="Account Number">
              <Input
                value={(formData as any).accountnumber || ""}
                onChange={(e) => handleChange("accountnumber", (e as any).target.value)}
                placeholder="e.g. ACC-001"
              />
            </Field>

            <Field label="Phone">
              <Input
                value={(formData as any).telephone1 || ""}
                onChange={(e) => handleChange("telephone1", (e as any).target.value)}
                placeholder="e.g. +1 (555) 123-4567"
                type="tel"
              />
            </Field>
          </div>

          <div className={(styles as any).row}>
            <Field label="Email">
              <Input
                value={(formData as any).emailaddress1 || ""}
                onChange={(e) => handleChange("emailaddress1", (e as any).target.value)}
                placeholder="e.g. contact@example.com"
                type="email"
              />
            </Field>

            <Field label="Website">
              <Input
                value={(formData as any).websiteurl || ""}
                onChange={(e) => handleChange("websiteurl", (e as any).target.value)}
                placeholder="e.g. https://example.com"
                type="url"
              />
            </Field>
          </div>

          <div className={(styles as any).row}>
            <Field label="Revenue (USD)">
              <Input
                value={(formData as any).revenue?.toString() || ""}
                onChange={(e) => handleChange("revenue", (e as any).target.value)}
                placeholder="e.g. 1000000"
                type="number"
              />
            </Field>

            <Field label="Number of Employees">
              <Input
                value={(formData as any).numberofemployees?.toString() || ""}
                onChange={(e) => handleChange("numberofemployees", (e as any).target.value)}
                placeholder="e.g. 100"
                type="number"
              />
            </Field>
          </div>

          <div className={(styles as any).row}>
            <Field label="City">
              <Input
                value={(formData as any).address1_city || ""}
                onChange={(e) => handleChange("address1_city", (e as any).target.value)}
                placeholder="e.g. Seattle"
              />
            </Field>

            <Field label="State/Province">
              <Input
                value={(formData as any).address1_stateorprovince || ""}
                onChange={(e) => handleChange("address1_stateorprovince", (e as any).target.value)}
                placeholder="e.g. WA"
              />
            </Field>
          </div>

          <Field label="Country">
            <Input
              value={(formData as any).address1_country || ""}
              onChange={(e) => handleChange("address1_country", (e as any).target.value)}
              placeholder="e.g. USA"
            />
          </Field>

          <Field label="Description">
            <Input
              value={(formData as any).description || ""}
              onChange={(e) => handleChange("description", (e as any).target.value)}
              placeholder="Enter account description"
            />
          </Field>

          <div className={(styles as any).actions}>
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
