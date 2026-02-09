import { makeStyles, tokens, Title3, Text, Card, Badge } from "@fluentui/react-components";
import {
  CheckmarkCircleRegular,
  ErrorCircleRegular,
  ShieldCheckmarkRegular,
} from "@fluentui/react-icons";

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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },
  card: {
    padding: "24px",
  },
  codeBlock: {
    backgroundColor: (tokens as any).colorNeutralBackground3,
    padding: "16px",
    borderRadius: (tokens as any).borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: "12px",
    marginTop: "12px",
    whiteSpace: "pre-wrap",
  },
  example: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  exampleTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
});

export default function TypeSafety() {
  const styles = useStyles();

  return (
    <div className={(styles as any).container}>
      <div className={(styles as any).header}>
        <Title3>Type Safety Demonstrations</Title3>
        <Text className={(styles as any).description}>
          Compile-time type checking, strict metadata types, and preventing runtime errors
        </Text>
      </div>

      <div className={(styles as any).grid}>
        <Card className={(styles as any).card}>
          <Title3>Metadata Type Strictness</Title3>
          <Text>Generated metadata types enforce strict typing at compile time</Text>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">✅ Valid - Compiles Successfully</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
  name: 'Contoso Ltd',          // Required field
  revenue: 5000000,             // Optional field
  numberofemployees: 500        // Optional field
};

await (client as any).api('/accounts').post(account);`}</div>
          </div>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <ErrorCircleRegular color={(tokens as any).colorStatusDangerForeground1} />
              <Text weight="semibold">❌ Invalid - Won't Compile</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
  name: 'Contoso Ltd',
  // ❌ ERROR: Read-only field not allowed in create
  accountid: '12345-67890',
  // ❌ ERROR: Internal field excluded from write types
  versionnumber: 12345,
  // ❌ ERROR: Type mismatch
  revenue: "not a number"
};`}</div>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Read vs Create/Update Types</Title3>
          <Text>Separate types for read and write operations prevent invalid payloads</Text>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">Read Type (All Fields)</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`import { AccountRead } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountRead = await client
  .api<AccountRead>('/accounts(id)')
  .get();

// All fields available:
(console as any).log((account as any).accountid);      // Read-only
(console as any).log((account as any).versionnumber);  // Internal
(console as any).log((account as any).name);           // Normal field
(console as any).log((account as any).revenue);        // Normal field`}</div>
          </div>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <ShieldCheckmarkRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">Create Type (Writable Only)</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
  name: 'Contoso',
  revenue: 1000000
  // ✓ accountid excluded (read-only)
  // ✓ versionnumber excluded (internal)
};

await (client as any).api('/accounts').post(account);`}</div>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>OData Type Discrimination</Title3>
          <Text>@(odata as any).type enforcement for polymorphic operations</Text>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">Correct Type Annotation</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`// Bulk operations require @(odata as any).type
await (client as any).api('/CreateMultiple').post({
  Targets: [
    {
      '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
      name: 'Account 1'
    },
    {
      '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
      name: 'Account 2'
    }
  ]
});`}</div>
          </div>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <ErrorCircleRegular color={(tokens as any).colorStatusDangerForeground1} />
              <Text weight="semibold">Missing Type (Runtime Error)</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`// ❌ Runtime error: @(odata as any).type required
await (client as any).api('/CreateMultiple').post({
  Targets: [
    {
      // Missing '@(odata as any).type'
      name: 'Account 1'
    }
  ]
});`}</div>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Action/Function Type Safety</Title3>
          <Text>Typed request and response parameters for actions and functions</Text>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">Typed Action Call</Text>
            </div>
            <div className={(styles as any).codeBlock}>{`import { 
  WinOpportunityRequest,
  WinOpportunityResponse 
} from '@mohsinonxrm/dataverse-sdk-actions';

const request: WinOpportunityRequest = {
  OpportunityClose: {
    '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).opportunityclose',
    subject: 'Won the deal!',
    'opportunityid@(odata as any).bind': '/opportunities(id)'
  },
  Status: 3  // ✓ Type: number (OptionSet value)
};

const response: WinOpportunityResponse = 
  await (client as any).api('/WinOpportunity').post(request);

// ✓ IntelliSense for response properties`}</div>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>OptionSet Type Safety</Title3>
          <Text>Strongly typed option sets with numeric values</Text>

          <div className={(styles as any).example}>
            <div className={(styles as any).exampleTitle}>
              <CheckmarkCircleRegular color={(tokens as any).colorStatusSuccessForeground1} />
              <Text weight="semibold">Typed OptionSet Values</Text>
            </div>
            <div
              className={(styles as any).codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@(odata as any).type': '(Microsoft as any).Dynamics.(CRM as any).account',
  name: 'Contoso',
  // ✓ accountcategorycode is number | { Value: number }
  accountcategorycode: 1,  // Preferred customer
  // OR
  accountcategorycode: { Value: 1 }
};

// ❌ Won't compile: string not assignable
// accountcategorycode: "1"`}</div>
          </div>
        </Card>

        <Card className={(styles as any).card}>
          <Title3>Benefits of Type Safety</Title3>
          <Text>Compile-time guarantees prevent runtime errors</Text>

          <div style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "12px" }}>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>Catch errors during development, not in production</Text>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>IntelliSense auto-completion for all Dataverse entities</Text>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>Prevent invalid field assignments (read-only, internal)</Text>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>Type-safe action/function parameters and responses</Text>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>Refactoring safety - compiler catches breaking changes</Text>
            </div>
            <div>
              <Badge appearance="filled" color="success" style={{ marginRight: "8px" }}>
                ✓
              </Badge>
              <Text>Documentation via types - no need to check API docs</Text>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ padding: "24px", marginTop: "24px" }}>
        <Title3>Type Generation</Title3>
        <Text>Generate types for your custom entities and fields</Text>

        <div
          className={(styles as any).codeBlock}
          style={{ marginTop: "16px" }}
        >{`# Generate types from your Dataverse environment
pnpm dataverse-sdk-generator \\
  --url "https://(org as any).crm.(dynamics as any).com" \\
  --output "./src/generated" \\
  --auth clientcredentials \\
  --clientId "abc-123" \\
  --clientSecret "secret" \\
  --tenantId "tenant-id"

# Generated files:
# - (entities as any).ts       (Read types)
# - (entities as any).create.ts (Create types)
# - (entities as any).update.ts (Update types)
# - (actions as any).ts        (Action types)
# - (functions as any).ts      (Function types)`}</div>
      </Card>
    </div>
  );
}
