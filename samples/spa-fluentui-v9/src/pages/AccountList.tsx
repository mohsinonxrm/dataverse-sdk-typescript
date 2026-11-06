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
    backgroundColor: tokens.colorNeutralBackground3,
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
    backgroundColor: tokens.colorNeutralBackground1,
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
    void initializeClient();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredAccounts(
        accountList.filter(
          (acc) =>
            acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            acc.accountnumber?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredAccounts(accountList);
    }
  }, [searchTerm, accountList]);

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

      setAccountList(response.value || []);
    } catch (error) {
      console.error("Failed to load accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (accountId: string, accountName: string) => {
    if (!client) return;

    if (confirm(`Are you sure you want to delete "${accountName}"?`)) {
      try {
        await client.api(`/accounts(${accountId})`).delete();
        await loadAccounts(client);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete account");
      }
    }
  };

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="large" label="Loading accounts..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Title1>Accounts</Title1>
          <Body1>{filteredAccounts.length} account(s) found</Body1>
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
        className={styles.search}
        placeholder="Search accounts..."
        contentBefore={<SearchRegular />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Card>
        <Table className={styles.table}>
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
            {filteredAccounts.map((account) => (
              <TableRow key={account.accountid}>
                <TableCell>
                  <Button
                    appearance="subtle"
                    onClick={() => navigate(`/accounts/${account.accountid}`)}
                  >
                    {account.name}
                  </Button>
                </TableCell>
                <TableCell>{account.accountnumber || "—"}</TableCell>
                <TableCell>{account.telephone1 || "—"}</TableCell>
                <TableCell>{account.emailaddress1 || "—"}</TableCell>
                <TableCell>
                  {account.revenue ? `$${account.revenue.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell>
                  {account.createdon ? new Date(account.createdon).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                      size="small"
                      icon={<EditRegular />}
                      onClick={() => navigate(`/accounts/${account.accountid}`)}
                    />
                    <Button
                      size="small"
                      icon={<DeleteRegular />}
                      onClick={() => handleDelete(account.accountid, account.name)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredAccounts.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <Body1 style={{ color: tokens.colorNeutralForeground3 }}>
              {searchTerm ? "No accounts match your search" : "No accounts yet"}
            </Body1>
          </div>
        )}
      </Card>
    </div>
  );
}
