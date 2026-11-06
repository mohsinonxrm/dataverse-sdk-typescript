import { useState } from "react";
import { makeStyles, tokens, Title3, Text, Card, Button, Badge } from "@fluentui/react-components";
import { GlobeRegular, BuildingMultipleRegular } from "@fluentui/react-icons";
import { useDataverse } from "../../context/DataverseContext";
import { LoadingState } from "../../components/demo/LoadingState";
import { ErrorDisplay } from "../../components/errors/ErrorDisplay";
import { CodeComparison } from "../../components/demo/CodeComparison";
import {
  DiscoveryClient,
  OrganizationState,
  type OrganizationDetail,
} from "@mohsinonxrm/dataverse-sdk-discovery";

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
  card: {
    padding: "24px",
    marginTop: "24px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },
  orgList: {
    display: "grid",
    gap: "12px",
    marginTop: "24px",
  },
  orgCard: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orgInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  info: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export default function Discovery() {
  const styles = useStyles();
  const { isReady, tokenProvider } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [organizations, setOrganizations] = useState<OrganizationDetail[]>([]);
  const [selected, setSelected] = useState<OrganizationDetail | null>(null);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleDiscoverOrganizations = async () => {
    if (!tokenProvider) return;
    setLoading(true);
    setError(null);

    try {
      // DiscoveryClient asks the token provider for a Global Discovery token itself.
      const discoveryClient = new DiscoveryClient(tokenProvider);
      setOrganizations(await discoveryClient.listOrganizations());
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrganization = (org: OrganizationDetail) => {
    // The app talks to the environment configured in VITE_DATAVERSE_URL; selecting an
    // organization here only records the choice and shows the Web API URL to use.
    setSelected(org);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Global Discovery Service</Title3>
        <Text className={styles.description}>
          Discover and connect to Dataverse organizations across the Commercial cloud
        </Text>
      </div>

      <Card className={styles.card}>
        <Title3>Discover Organizations</Title3>
        <Text>
          The Global Discovery Service returns all Dataverse organizations the authenticated user
          has access to within the cloud region.
        </Text>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            icon={<GlobeRegular />}
            onClick={handleDiscoverOrganizations}
            disabled={loading}
          >
            Discover Organizations
          </Button>
        </div>

        {loading && <LoadingState label="Discovering organizations..." />}

        {error && (
          <ErrorDisplay
            error={error}
            onDismiss={() => setError(null)}
            onRetry={handleDiscoverOrganizations}
          />
        )}

        {selected && (
          <Text>
            Selected {selected.FriendlyName}: {selected.Url}. Set VITE_DATAVERSE_URL to this URL and
            restart to work against it.
          </Text>
        )}

        {organizations.length > 0 && (
          <div className={styles.orgList}>
            <Text weight="semibold">
              Found {organizations.length} organization
              {organizations.length !== 1 ? "s" : ""}
            </Text>

            {organizations.map((org) => (
              <div key={org.Id} className={styles.orgCard}>
                <div className={styles.orgInfo}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BuildingMultipleRegular fontSize={20} />
                    <Text weight="semibold">{org.FriendlyName}</Text>
                    <Badge appearance="outline" color="informative">
                      {org.State === OrganizationState.Enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    {org.UniqueName} • Version {org.Version}
                  </Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    {org.Url}
                  </Text>
                </div>
                <Button
                  size="small"
                  appearance="primary"
                  onClick={() => handleSelectOrganization(org)}
                >
                  Connect
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className={styles.card}>
        <Title3>Multi-Organization Scenarios</Title3>
        <Text>Common use cases for the Discovery Service</Text>

        <div className={styles.info}>
          <Text weight="semibold">When to Use Discovery Service:</Text>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>
              <Text>
                <strong>Multi-org applications:</strong> Allow users to select which organization to
                work with
              </Text>
            </li>
            <li>
              <Text>
                <strong>Admin tools:</strong> Manage multiple Dataverse environments from a single
                interface
              </Text>
            </li>
            <li>
              <Text>
                <strong>Migration utilities:</strong> Discover source and target organizations for
                data migration
              </Text>
            </li>
            <li>
              <Text>
                <strong>Environment discovery:</strong> Dynamically find available environments
                without hardcoding URLs
              </Text>
            </li>
          </ul>
        </div>

        <div className={styles.info} style={{ marginTop: "16px" }}>
          <Text weight="semibold">Cloud-Specific Endpoints:</Text>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>
              <Text>
                <strong>Commercial:</strong> https://globaldisco.crm.dynamics.com
              </Text>
            </li>
            <li>
              <Text>
                <strong>GCC:</strong> https://globaldisco.crm9.dynamics.com
              </Text>
            </li>
            <li>
              <Text>
                <strong>GCC High:</strong> https://globaldisco.crm.microsoftdynamics.us
              </Text>
            </li>
            <li>
              <Text>
                <strong>DoD:</strong> https://globaldisco.crm.appsplatform.us
              </Text>
            </li>
          </ul>
        </div>
      </Card>

      <CodeComparison
        items={[
          {
            label: "Discovery API Call",
            code: `// DiscoveryClient from @mohsinonxrm/dataverse-sdk-discovery
const discoveryClient = new DiscoveryClient(tokenProvider);

const orgs = await discoveryClient.listOrganizations();

// Returns OrganizationDetail[] with:
// - Id, UniqueName, FriendlyName
// - Url (application URL) and ApiUrl (use it as the DataverseClient baseUrl)
// - Version, State (0 = enabled), Region`,
            result: JSON.stringify(
              {
                discoveryEndpoint:
                  "https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances",
                organizationsFound: organizations.length,
                sampleOrganization: organizations[0] ?? null,
              },
              null,
              2
            ),
          },
        ]}
      />
    </div>
  );
}
