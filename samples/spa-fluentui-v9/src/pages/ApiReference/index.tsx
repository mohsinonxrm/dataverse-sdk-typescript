import { makeStyles, tokens, Title3, Text, Card } from "@fluentui/react-components";
import { CheckmarkCircleRegular, DismissCircleRegular } from "@fluentui/react-icons";

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
  table: {
    width: "100%",
    marginTop: "16px",
    borderCollapse: "collapse",
    "& th, & td": {
      padding: "12px",
      textAlign: "left",
      borderBottom: `1px solid ${(tokens as any).colorNeutralStroke1}`,
    },
    "& th": {
      fontWeight: 600,
      backgroundColor: (tokens as any).colorNeutralBackground3,
    },
  },
  section: {
    marginTop: "32px",
  },
});

export default function ApiReference() {
  const styles = useStyles();

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>API Reference & Decision Guides</Title3>
        <Text className={(styles as any).description}>
          Decision matrices, when-to-use guidance, and API comparison tables
        </Text>
      </div>

      <Card className={(styles as any).card}>
        <Title3>CRUD API Comparison</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Approach</th>
              <th>When to Use</th>
              <th>Pros</th>
              <th>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Text weight="semibold">Raw API</Text>
                <br />
                <Text size={200}>client.api('/accounts').post()</Text>
              </td>
              <td>
                <Text size={200}>
                  • Modern TypeScript projects
                  <br />• Flexible query building
                  <br />• Graph-like experience
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                  Fluent API
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Type-safe with generics
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Full control
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <DismissCircleRegular color={(tokens as any).colorNeutralForeground3} /> More
                  verbose
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text weight="semibold">Typed API</Text>
                <br />
                <Text size={200}>client.api&lt;Account&gt;().post()</Text>
              </td>
              <td>
                <Text size={200}>
                  • Need IntelliSense
                  <br />• Type safety critical
                  <br />• Generated types available
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                  Full IntelliSense
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Compile-time checks
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Refactoring safe
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <DismissCircleRegular color={(tokens as any).colorNeutralForeground3} /> Requires
                  type generation
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text weight="semibold">OrganizationService</Text>
                <br />
                <Text size={200}>orgService.create('accounts', data)</Text>
              </td>
              <td>
                <Text size={200}>
                  • C# developers
                  <br />• Migrating from .NET SDK
                  <br />• Familiar with Xrm patterns
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                  Familiar API
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Simple CRUD
                  <br />
                  <CheckmarkCircleRegular
                    color={(tokens as any).colorStatusSuccessForeground1}
                  />{" "}
                  Less boilerplate
                </Text>
              </td>
              <td>
                <Text size={200}>
                  <DismissCircleRegular color={(tokens as any).colorNeutralForeground3} /> Less
                  flexible
                  <br />
                  <DismissCircleRegular color={(tokens as any).colorNeutralForeground3} />{" "}
                  String-based entity names
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className={(styles as any).card}>
        <Title3>Bulk Operations vs Batch</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Bulk Operations</th>
              <th>$batch</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Single entity, same operation (100+ records)</td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Optimized
              </td>
              <td>
                <DismissCircleRegular color={(tokens as any).colorNeutralForeground3} /> More
                overhead
              </td>
              <td>
                <Text weight="semibold">Use Bulk Operations</Text>
              </td>
            </tr>
            <tr>
              <td>Multiple entity types</td>
              <td>
                <DismissCircleRegular color={(tokens as any).colorStatusDangerForeground1} /> Not
                supported
              </td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Supported
              </td>
              <td>
                <Text weight="semibold">Use $batch</Text>
              </td>
            </tr>
            <tr>
              <td>Mixed operations (create + update + delete)</td>
              <td>
                <DismissCircleRegular color={(tokens as any).colorStatusDangerForeground1} /> Not
                supported
              </td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Supported
              </td>
              <td>
                <Text weight="semibold">Use $batch</Text>
              </td>
            </tr>
            <tr>
              <td>Transactional (all or nothing)</td>
              <td>
                <Text size={200}>Partial (ConcurrencyBehavior)</Text>
              </td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Full changesets
              </td>
              <td>
                <Text weight="semibold">Use $batch changesets</Text>
              </td>
            </tr>
            <tr>
              <td>Performance critical (1000+ records)</td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Fastest
              </td>
              <td>
                <Text size={200}>Good but slower</Text>
              </td>
              <td>
                <Text weight="semibold">Use Bulk Operations</Text>
              </td>
            </tr>
            <tr>
              <td>Need per-record error details</td>
              <td>
                <Text size={200}>Limited</Text>
              </td>
              <td>
                <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />{" "}
                Detailed
              </td>
              <td>
                <Text weight="semibold">Use $batch with continue-on-error</Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className={(styles as any).card}>
        <Title3>Actions vs Functions</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Actions</th>
              <th>Functions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HTTP Method</td>
              <td>POST</td>
              <td>GET</td>
            </tr>
            <tr>
              <td>Side Effects</td>
              <td>✅ May modify data</td>
              <td>❌ Read-only (should not modify)</td>
            </tr>
            <tr>
              <td>Caching</td>
              <td>❌ Not cached</td>
              <td>✅ Can be cached by browser/proxy</td>
            </tr>
            <tr>
              <td>Parameters</td>
              <td>Request body (JSON)</td>
              <td>Query string (parameter aliases)</td>
            </tr>
            <tr>
              <td>Examples</td>
              <td>
                WinOpportunity
                <br />
                ExecuteWorkflow
                <br />
                CreateMultiple
                <br />
                GrantAccess
              </td>
              <td>
                WhoAmI
                <br />
                RetrieveVersion
                <br />
                RetrievePrincipalAccess
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className={(styles as any).card}>
        <Title3>Pagination Methods</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Method</th>
              <th>Use Case</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Text weight="semibold">get()</Text>
              </td>
              <td>Single page (default 5000 records max)</td>
              <td>
                <Text size={200} style={{ fontFamily: "monospace" }}>
                  const data = await builder.get();
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text weight="semibold">getPage()</Text>
              </td>
              <td>Page-by-page with nextLink tracking</td>
              <td>
                <Text size={200} style={{ fontFamily: "monospace" }}>
                  const page = await builder.getPage();
                  <br />
                  if (page['@odata.nextLink']) {"{...}"}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text weight="semibold">iterate()</Text>
              </td>
              <td>Stream processing, break early</td>
              <td>
                <Text size={200} style={{ fontFamily: "monospace" }}>
                  for await (const item of builder.iterate()) {"{...}"}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text weight="semibold">getAll()</Text>
              </td>
              <td>Bounded all-records fetch</td>
              <td>
                <Text size={200} style={{ fontFamily: "monospace" }}>
                  const all = await builder.getAll({"{"} maxItems: 1000 {"}"});
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className={(styles as any).card}>
        <Title3>Authentication Approaches</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Package</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Single Page App (SPA)</td>
              <td>dataverse-sdk-auth-msal-browser</td>
              <td>Interactive (popup/redirect)</td>
            </tr>
            <tr>
              <td>Node CLI Tool</td>
              <td>dataverse-sdk-auth-msal-node</td>
              <td>Device code</td>
            </tr>
            <tr>
              <td>Background Service / Daemon</td>
              <td>dataverse-sdk-auth-msal-node</td>
              <td>Client credentials</td>
            </tr>
            <tr>
              <td>Server-side Web App</td>
              <td>dataverse-sdk-auth-msal-node</td>
              <td>Auth code + PKCE</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className={(styles as any).card}>
        <Title3>Error Handling Strategies</Title3>
        <table className={(styles as any).table}>
          <thead>
            <tr>
              <th>Error Type</th>
              <th>Automatic Retry?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>429 Too Many Requests</td>
              <td>✅ Yes (honors Retry-After)</td>
              <td>Wait and retry automatically</td>
            </tr>
            <tr>
              <td>502, 503, 504 (Server errors)</td>
              <td>✅ Yes (exponential backoff)</td>
              <td>Retry up to max attempts (default 3)</td>
            </tr>
            <tr>
              <td>400 Bad Request</td>
              <td>❌ No</td>
              <td>Fix request payload</td>
            </tr>
            <tr>
              <td>401 Unauthorized</td>
              <td>❌ No</td>
              <td>Refresh authentication token</td>
            </tr>
            <tr>
              <td>403 Forbidden</td>
              <td>❌ No</td>
              <td>Check user permissions</td>
            </tr>
            <tr>
              <td>404 Not Found</td>
              <td>❌ No</td>
              <td>Verify resource exists</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className={(styles as any).section}>
        <Title3>Quick Reference: Package Selection</Title3>
        <Text className={(styles as any).description}>
          Choose the right SDK package for your needs
        </Text>

        <div style={{ marginTop: "24px" }}>
          <Text weight="semibold">Essential (Always needed):</Text>
          <ul style={{ marginTop: "8px" }}>
            <li>@mohsinonxrm/dataverse-sdk-core</li>
            <li>@mohsinonxrm/dataverse-sdk-auth-msal-browser OR auth-msal-node</li>
          </ul>

          <Text weight="semibold" style={{ marginTop: "16px", display: "block" }}>
            Optional (Based on use case):
          </Text>
          <ul style={{ marginTop: "8px" }}>
            <li>dataverse-sdk-xrm - For C#-style OrganizationService API</li>
            <li>dataverse-sdk-batch - For $batch operations with changesets</li>
            <li>dataverse-sdk-actions - For typed Web API actions</li>
            <li>dataverse-sdk-functions - For typed Web API functions</li>
            <li>dataverse-sdk-messages - For SDK messages (Assign, SetState, etc.)</li>
            <li>dataverse-sdk-metadata - For metadata CRUD operations</li>
            <li>dataverse-sdk-files - For file/image column operations</li>
            <li>dataverse-sdk-discovery - For multi-org scenarios</li>
            <li>dataverse-sdk-appinsights - For Application Insights telemetry</li>
            <li>dataverse-sdk-otel - For OpenTelemetry integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
