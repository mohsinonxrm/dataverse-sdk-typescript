import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Title1,
  Title2,
  Title3,
  Body1,
  Card,
  Button,
  Spinner,
} from "@fluentui/react-components";
import type { Account } from "../types/Account";
import {
  BuildingRegular,
  AddRegular,
  PeopleRegular,
  MoneyRegular,
  ArrowRightRegular,
  CodeRegular,
  DatabaseRegular,
  CloudRegular,
  GaugeRegular,
  ShieldCheckmarkRegular,
  BookRegular,
} from "@fluentui/react-icons";
import { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalBrowserTokenProvider } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";
import { dataverseUrl, loginRequest } from "../config";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  card: {
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow16,
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  cardIcon: {
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
  },
  cardValue: {
    fontSize: "36px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
    marginBottom: "8px",
  },
  recentSection: {
    marginTop: "32px",
  },
  accountsList: {
    display: "grid",
    gap: "12px",
    marginTop: "16px",
  },
  accountItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});

interface DashboardStats {
  totalAccounts: number;
  activeAccounts: number;
  totalRevenue: number;
}

export default function Dashboard() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAccounts, setRecentAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const tokenProvider = new MsalBrowserTokenProvider(instance, {
        account: accounts[0],
        scopes: loginRequest.scopes,
      });

      const client = new DataverseClient({
        baseUrl: dataverseUrl,
        apiVersion: "v9.2",
        tokenProvider,
      });

      // Fetch stats
      const allAccounts = await client
        .api("/accounts")
        .select("accountid", "statecode", "revenue")
        .getAll<Pick<Account, "accountid" | "revenue"> & { statecode: number }>({ maxItems: 1000 });

      const total = allAccounts.length;
      const active = allAccounts.filter((a) => a.statecode === 0).length;
      const revenue = allAccounts.reduce((sum, a) => sum + (a.revenue ?? 0), 0);

      setStats({
        totalAccounts: total,
        activeAccounts: active,
        totalRevenue: revenue,
      });

      // Fetch recent accounts
      const recent = await client
        .api("/accounts")
        .select("accountid", "name", "revenue", "createdon")
        .orderBy("createdon desc")
        .top(5)
        .get<{ value: Account[] }>();

      setRecentAccounts(recent.value || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={styles.container}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Spinner size="large" label="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title1>Dashboard</Title1>
        <Body1>Welcome back! Here's an overview of your accounts.</Body1>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card} onClick={() => navigate("/accounts")}>
          <div className={styles.cardHeader}>
            <BuildingRegular className={styles.cardIcon} />
            <Title2>Total Accounts</Title2>
          </div>
          <div className={styles.cardValue}>{stats?.totalAccounts || 0}</div>
          <Body1>All accounts in the system</Body1>
        </Card>

        <Card className={styles.card} onClick={() => navigate("/accounts")}>
          <div className={styles.cardHeader}>
            <PeopleRegular className={styles.cardIcon} />
            <Title2>Active Accounts</Title2>
          </div>
          <div className={styles.cardValue}>{stats?.activeAccounts || 0}</div>
          <Body1>Currently active accounts</Body1>
        </Card>

        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <MoneyRegular className={styles.cardIcon} />
            <Title2>Total Revenue</Title2>
          </div>
          <div className={styles.cardValue}>
            ${((stats?.totalRevenue || 0) / 1000000).toFixed(1)}M
          </div>
          <Body1>Aggregate account revenue</Body1>
        </Card>
      </div>

      <div className={styles.recentSection}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Title2>Recently Created Accounts</Title2>
          <Button
            appearance="subtle"
            icon={<ArrowRightRegular />}
            onClick={() => navigate("/accounts")}
          >
            View All
          </Button>
        </div>

        <Card>
          <div className={styles.accountsList}>
            {recentAccounts.length === 0 ? (
              <Body1
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: tokens.colorNeutralForeground3,
                }}
              >
                No accounts yet.{" "}
                <Button appearance="subtle" onClick={() => navigate("/accounts/new")}>
                  Create your first account
                </Button>
              </Body1>
            ) : (
              recentAccounts.map((account) => (
                <div
                  key={account.accountid}
                  className={styles.accountItem}
                  onClick={() => navigate(`/accounts/${account.accountid}`)}
                >
                  <div>
                    <Title2 as="h3">{account.name}</Title2>
                    <Body1 style={{ color: tokens.colorNeutralForeground3 }}>
                      Created{" "}
                      {account.createdon
                        ? new Date(account.createdon).toLocaleDateString()
                        : "unknown"}
                    </Body1>
                  </div>
                  <Body1>{account.revenue ? `$${account.revenue.toLocaleString()}` : "N/A"}</Body1>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: "48px" }}>
        <Title2 style={{ marginBottom: "16px" }}>SDK Scenarios</Title2>
        <Body1 style={{ color: tokens.colorNeutralForeground3, marginBottom: "24px" }}>
          Explore comprehensive examples demonstrating all capabilities of the Dataverse SDK
        </Body1>

        <div className={styles.grid}>
          <Card className={styles.card} onClick={() => navigate("/scenarios/crud")}>
            <div className={styles.cardHeader}>
              <CodeRegular className={styles.cardIcon} />
              <div>
                <Title3>CRUD Operations</Title3>
                <Body1>3 API approaches</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/querying")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>Advanced Querying</Title3>
                <Body1>Filters, pagination, FetchXML</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/bulk")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>Bulk Operations</Title3>
                <Body1>CreateMultiple, UpdateMultiple</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/batch")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>Batch Operations</Title3>
                <Body1>$batch with changesets</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/relationships")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>Relationships</Title3>
                <Body1>Associate, disassociate, bind</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/metadata")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>Metadata Explorer</Title3>
                <Body1>Entity/attribute CRUD, delta queries</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/files")}>
            <div className={styles.cardHeader}>
              <DatabaseRegular className={styles.cardIcon} />
              <div>
                <Title3>File Operations</Title3>
                <Body1>Chunked upload/download (4MB)</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/actions")}>
            <div className={styles.cardHeader}>
              <CodeRegular className={styles.cardIcon} />
              <div>
                <Title3>Actions & Functions</Title3>
                <Body1>Typed Web API calls</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/messages")}>
            <div className={styles.cardHeader}>
              <CodeRegular className={styles.cardIcon} />
              <div>
                <Title3>SDK Messages</Title3>
                <Body1>1000+ typed messages</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/discovery")}>
            <div className={styles.cardHeader}>
              <CloudRegular className={styles.cardIcon} />
              <div>
                <Title3>Discovery Service</Title3>
                <Body1>Multi-org scenarios</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/observability")}>
            <div className={styles.cardHeader}>
              <GaugeRegular className={styles.cardIcon} />
              <div>
                <Title3>Observability</Title3>
                <Body1>Retry, throttling, telemetry</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/typesafety")}>
            <div className={styles.cardHeader}>
              <ShieldCheckmarkRegular className={styles.cardIcon} />
              <div>
                <Title3>Type Safety</Title3>
                <Body1>Compile-time checks</Body1>
              </div>
            </div>
          </Card>

          <Card className={styles.card} onClick={() => navigate("/scenarios/reference")}>
            <div className={styles.cardHeader}>
              <BookRegular className={styles.cardIcon} />
              <div>
                <Title3>API Reference</Title3>
                <Body1>Decision matrices, guidance</Body1>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={() => navigate("/accounts/new")}
        >
          Create New Account
        </Button>
        <Button appearance="secondary" onClick={() => navigate("/accounts")}>
          View All Accounts
        </Button>
      </div>
    </div>
  );
}
