import { useState, useEffect } from "react";
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
  Spinner,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@fluentui/react-components";
import { AddRegular, SearchRegular, EditRegular, DeleteRegular } from "@fluentui/react-icons";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { dataverseUrl, loginRequest } from "../config";
import type { Account } from "../types/Account";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "32px",
    backgroundColor: (tokens as any).colorNeutralBackground3,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  search: {
    marginBottom: "24px",
    maxWidth: "400px",
  },
  table: {
    backgroundColor: (tokens as any).colorNeutralBackground1,
  },
});

export default function AccountList() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [client, setClient] = useState<DataverseClient | null>(null);

  useEffect(() => {
    initializeClient();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredAccounts(
        (accountList as any).filter(
          (acc) =>
            (acc as any).name.toLowerCase().includes((searchTerm as any).toLowerCase()) ||
            (acc as any).accountnumber?.toLowerCase().includes((searchTerm as any).toLowerCase())
        )
      );
    } else {
      setFilteredAccounts(accountList);
    }
  }, [searchTerm, accountList]);

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
    await loadAccounts(dataverseClient);
  };

  const loadAccounts = async (dataverseClient: DataverseClient) => {
    try {
      setLoading(true);
      const response = await dataverseClient
        .api("/accounts")
        .select(
          "accountid",
          "name",
          "accountnumber",
          "telephone1",
          "emailaddress1",
          "revenue",
          "createdon"
        )
        .orderBy("createdon desc")
        .top(50)
        .get<{ value: Account[] }>();

      setAccountList((response as any).value || []);
    } catch (error) {
      (console as any).error("Failed to load accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (accountId: string, accountName: string) => {
    if (!client) return;

    if (confirm(`Are you sure you want to delete "${accountName}"?`)) {
      try {
        await (client as any).api(`/accounts(${accountId})`).delete();
        await loadAccounts(client);
      } catch (error) {
        (console as any).error("Delete failed:", error);
        alert("Failed to delete account");
      }
    }
  };

  if (loading) {
    return (
      <div
        className={(styles as any).container}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="large" label="Loading accounts..." />
      </div>
    );
  }

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <div>
          <Title1>Accounts</Title1>
          <Body1>{(filteredAccounts as any).length} account(s) found</Body1>
        </div>
        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={() => navigate("/accounts/new")}
        >
          Create Account
        </Button>
      </div>

      <Input
        className={(styles as any).search}
        placeholder="Search accounts..."
        contentBefore={<SearchRegular />}
        value={searchTerm}
        onChange={(e) => setSearchTerm((e as any).target.value)}
      />

      <Card>
        <Table className={(styles as any).table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Account Number</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Revenue</TableHeaderCell>
              <TableHeaderCell>Created</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredAccounts as any).map((account) => (
              <TableRow key={(account as any).accountid}>
                <TableCell>
                  <Button
                    appearance="subtle"
                    onClick={() => navigate(`/accounts/${(account as any).accountid}`)}
                  >
                    {(account as any).name}
                  </Button>
                </TableCell>
                <TableCell>{(account as any).accountnumber || "—"}</TableCell>
                <TableCell>{(account as any).telephone1 || "—"}</TableCell>
                <TableCell>{(account as any).emailaddress1 || "—"}</TableCell>
                <TableCell>
                  {(account as any).revenue ? `$${(account as any).revenue.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell>
                  {(account as any).createdon
                    ? new Date((account as any).createdon).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      size="small"
                      icon={<EditRegular />}
                      onClick={() => navigate(`/accounts/${(account as any).accountid}`)}
                    />
                    <Button
                      size="small"
                      icon={<DeleteRegular />}
                      onClick={() =>
                        handleDelete((account as any).accountid, (account as any).name)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {(filteredAccounts as any).length === 0 && (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <Body1 style={{ color: (tokens as any).colorNeutralForeground3 }}>
              {searchTerm ? "No accounts match your search" : "No accounts yet"}
            </Body1>
          </div>
        )}
      </Card>
    </div>
  );
}
