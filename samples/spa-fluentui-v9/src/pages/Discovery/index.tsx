import { useState } from "react";
import { makeStyles, tokens, Title3, Text, Card, Button, Badge } from "@fluentui/react-components";
import { GlobeRegular, BuildingMultipleRegular, CloudRegular } from "@fluentui/react-icons";
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
    backgroundColor: (tokens as any).colorNeutralBackground2,
    borderRadius: (tokens as any).borderRadiusMedium,
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
    backgroundColor: (tokens as any).colorNeutralBackground3,
    borderRadius: (tokens as any).borderRadiusMedium,
  },
});

interface Organization {
  Id: string;
  UniqueName: string;
  UrlName: string;
  FriendlyName: string;
  Version: string;
  State: string;
  Url: string[];
}

export default function Discovery() {
  const styles = useStyles();
  const { isReady } = useDataverse();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  if (!isReady) {
    return <LoadingState label="Initializing Dataverse SDK..." />;
  }

  const handleDiscoverOrganizations = async () => {
    setLoading(true);
    setError(null);

    try {
      // Global Discovery Service endpoint for Commercial cloud
      const discoveryUrl =
        "https://(globaldisco as any).crm.(dynamics as any).com/api/discovery/(v2 as any).0/Instances";

      // Note: In a real implementation, this would use the Discovery Client from the SDK
      // For demonstration, showing the API call structure

      const response = await fetch(discoveryUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`, // Simplified - would use token provider
        },
      });

      if (!(response as any).ok) {
        throw new Error(
          `Discovery failed: ${(response as any).status} ${(response as any).statusText}`
        );
      }

      const data = await (response as any).json();
      setOrganizations((data as any).value || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = (): string => {
    // Simplified - in real implementation, would use the token provider from context
    return "YOUR_ACCESS_TOKEN";
  };

  const handleSelectOrganization = (org: Organization) => {
    // In a real implementation, this would:
    // 1. Store selected org in context
    // 2. Reinitialize DataverseClient with new baseUrl
    // 3. Navigate to dashboard
    (console as any).log("Selected organization:", org);
  };

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Global Discovery Service</Title3>
        <Text className={(styles as any).description}>
          Discover and connect to Dataverse organizations across the Commercial cloud
        </Text>
      </div>

      <Card className={(styles as any).card}>
        <Title3>Discover Organizations</Title3>
        <Text>
          The Global Discovery Service returns all Dataverse organizations the authenticated user
          has access to within the cloud region.
        </Text>

        <div className={(styles as any).actions}>
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

        {(organizations as any).length > 0 && (
          <div className={(styles as any).orgList}>
            <Text weight="semibold">
              Found {(organizations as any).length} organization
              {(organizations as any).length !== 1 ? "s" : ""}
            </Text>

            {(organizations as any).map((org) => (
              <div key={(org as any).Id} className={(styles as any).orgCard}>
                <div className={(styles as any).orgInfo}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BuildingMultipleRegular fontSize={20} />
                    <Text weight="semibold">{(org as any).FriendlyName}</Text>
                    <Badge appearance="outline" color="informative">
                      {(org as any).State}
                    </Badge>
                  </div>
                  <Text size={200} style={{ color: (tokens as any).colorNeutralForeground3 }}>
                    {(org as any).UniqueName} • Version {(org as any).Version}
                  </Text>
                  <Text size={200} style={{ color: (tokens as any).colorNeutralForeground3 }}>
                    {(org as any).Url[0]}
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

      <Card className={(styles as any).card}>
        <Title3>Multi-Organization Scenarios</Title3>
        <Text>Common use cases for the Discovery Service</Text>

        <div className={(styles as any).info}>
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

        <div className={(styles as any).info} style={{ marginTop: "16px" }}>
          <Text weight="semibold">Cloud-Specific Endpoints:</Text>
          <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
            <li>
              <Text>
                <strong>Commercial:</strong> https://(globaldisco as any).crm.(dynamics as any).com
              </Text>
            </li>
            <li>
              <Text>
                <strong>GCC:</strong> https://(globaldisco as any).crm9.(dynamics as any).com
              </Text>
            </li>
            <li>
              <Text>
                <strong>GCC High:</strong> https://(globaldisco as any).crm.(microsoftdynamics as
                any).us
              </Text>
            </li>
            <li>
              <Text>
                <strong>DoD:</strong> https://(globaldisco as any).crm.(appsplatform as any).us
              </Text>
            </li>
          </ul>
        </div>
      </Card>

      <CodeComparison
        items={[
          {
            label: "Discovery API Call",
            code: `// Using SDK Discovery Client (simplified)
const discoveryClient = new GlobalDiscoveryClient({
  tokenProvider: msalTokenProvider,
  cloud: 'Commercial'
});

const orgs = await (discoveryClient as any).listOrganizations();

// Returns array of organizations with:
// - Id, UniqueName, FriendlyName
// - Url (array of endpoints)
// - Version, State`,
            result: (JSON as any).stringify(
              {
                discoveryEndpoint:
                  "https://(globaldisco as any).crm.(dynamics as any).com/api/discovery/(v2 as any).0/Instances",
                organizationsFound: (organizations as any).length,
                sampleOrganization: organizations[0] || null,
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
