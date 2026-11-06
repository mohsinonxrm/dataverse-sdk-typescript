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
    color: tokens.colorNeutralForeground2,
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
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
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
    <div className={styles.container}>
      <div className={styles.header}>
        <Title3>Type Safety Demonstrations</Title3>
        <Text className={styles.description}>
          Compile-time type checking, strict metadata types, and preventing runtime errors
        </Text>
      </div>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <Title3>Metadata Type Strictness</Title3>
          <Text>Generated metadata types enforce strict typing at compile time</Text>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <CheckmarkCircleRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">✅ Valid - Compiles Successfully</Text>
            </div>
            <div
              className={styles.codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@odata.type': 'Microsoft.Dynamics.CRM.account',
  name: 'Contoso Ltd',          // Required field
  revenue: 5000000,             // Optional field
  numberofemployees: 500        // Optional field
};

await client.api('/accounts').post(account);`}</div>
          </div>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <ErrorCircleRegular color={tokens.colorStatusDangerForeground1} />
              <Text weight="semibold">❌ Invalid - Won't Compile</Text>
            </div>
            <div
              className={styles.codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@odata.type': 'Microsoft.Dynamics.CRM.account',
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

        <Card className={styles.card}>
          <Title3>Read vs Create/Update Types</Title3>
          <Text>Separate types for read and write operations prevent invalid payloads</Text>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <CheckmarkCircleRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">Read Type (All Fields)</Text>
            </div>
            <div
              className={styles.codeBlock}
            >{`import { AccountRead } from '@mohsinonxrm/dataverse-sdk-metadata';

const account = await client
  .api('/accounts(id)')
  .get<AccountRead>();

// All fields available:
console.log(account.accountid);      // Read-only
console.log(account.versionnumber);  // Internal
console.log(account.name);           // Normal field
console.log(account.revenue);        // Normal field`}</div>
          </div>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <ShieldCheckmarkRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">Create Type (Writable Only)</Text>
            </div>
            <div
              className={styles.codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@odata.type': 'Microsoft.Dynamics.CRM.account',
  name: 'Contoso',
  revenue: 1000000
  // ✓ accountid excluded (read-only)
  // ✓ versionnumber excluded (internal)
};

await client.api('/accounts').post(account);`}</div>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>OData Type Discrimination</Title3>
          <Text>@odata.type enforcement for polymorphic operations</Text>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <CheckmarkCircleRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">Correct Type Annotation</Text>
            </div>
            <div className={styles.codeBlock}>{`// Bulk operations require @odata.type
await client.api('/CreateMultiple').post({
  Targets: [
    {
      '@odata.type': 'Microsoft.Dynamics.CRM.account',
      name: 'Account 1'
    },
    {
      '@odata.type': 'Microsoft.Dynamics.CRM.account',
      name: 'Account 2'
    }
  ]
});`}</div>
          </div>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <ErrorCircleRegular color={tokens.colorStatusDangerForeground1} />
              <Text weight="semibold">Missing Type (Runtime Error)</Text>
            </div>
            <div className={styles.codeBlock}>{`// ❌ Runtime error: @odata.type required
await client.api('/CreateMultiple').post({
  Targets: [
    {
      // Missing '@odata.type'
      name: 'Account 1'
    }
  ]
});`}</div>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>Action/Function Type Safety</Title3>
          <Text>Typed request and response parameters for actions and functions</Text>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <CheckmarkCircleRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">Typed Action Call</Text>
            </div>
            <div className={styles.codeBlock}>{`import { 
  WinOpportunityRequest,
  WinOpportunityResponse 
} from '@mohsinonxrm/dataverse-sdk-actions';

const request: WinOpportunityRequest = {
  OpportunityClose: {
    '@odata.type': 'Microsoft.Dynamics.CRM.opportunityclose',
    subject: 'Won the deal!',
    'opportunityid@odata.bind': '/opportunities(id)'
  },
  Status: 3  // ✓ Type: number (OptionSet value)
};

const response: WinOpportunityResponse = 
  await client.api('/WinOpportunity').post(request);

// ✓ IntelliSense for response properties`}</div>
          </div>
        </Card>

        <Card className={styles.card}>
          <Title3>OptionSet Type Safety</Title3>
          <Text>Strongly typed option sets with numeric values</Text>

          <div className={styles.example}>
            <div className={styles.exampleTitle}>
              <CheckmarkCircleRegular color={tokens.colorStatusSuccessForeground1} />
              <Text weight="semibold">Typed OptionSet Values</Text>
            </div>
            <div
              className={styles.codeBlock}
            >{`import { AccountCreate } from '@mohsinonxrm/dataverse-sdk-metadata';

const account: AccountCreate = {
  '@odata.type': 'Microsoft.Dynamics.CRM.account',
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

        <Card className={styles.card}>
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
          className={styles.codeBlock}
          style={{ marginTop: "16px" }}
        >{`# Generate types from your Dataverse environment
pnpm dataverse-sdk-generator \\
  --url "https://org.crm.dynamics.com" \\
  --output "./src/generated" \\
  --auth clientcredentials \\
  --clientId "abc-123" \\
  --clientSecret "secret" \\
  --tenantId "tenant-id"

# Generated files:
# - entities.ts       (Read types)
# - entities.create.ts (Create types)
# - entities.update.ts (Update types)
# - actions.ts        (Action types)
# - functions.ts      (Function types)`}</div>
      </Card>
    </div>
  );
}
