import { ReactNode } from "react";
import { Card, CardHeader, makeStyles, tokens, Text } from "@fluentui/react-components";
import { Code24Regular, DocumentText24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  comparison: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "16px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: "13px",
    overflowX: "auto",
    lineHeight: "1.6",
  },
  resultBlock: {
    backgroundColor: tokens.colorNeutralBackground4,
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: "12px",
    overflowX: "auto",
    maxHeight: "400px",
    overflowY: "auto",
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
});

interface CodeComparisonProps {
  items: {
    label: string;
    code: string;
    result?: ReactNode;
  }[];
}

/**
 * CodeComparison Component
 *
 * Displays side-by-side code examples with optional results.
 * Useful for comparing different API approaches.
 *
 * @example
 * ```tsx
 * <CodeComparison
 *   items={[
 *     {
 *       label: 'Raw API',
 *       code: `const result = await client.api('/accounts').get();`,
 *       result: <pre>{JSON.stringify(data, null, 2)}</pre>
 *     },
 *     {
 *       label: 'OrgService',
 *       code: `const result = await orgService.retrieve('accounts', id);`,
 *       result: <pre>{JSON.stringify(data, null, 2)}</pre>
 *     }
 *   ]}
 * />
 * ```
 */
export function CodeComparison({ items }: CodeComparisonProps) {
  const styles = useStyles();

  return (
    <div className={styles.comparison}>
      {items.map((item, index) => (
        <div key={index} className={styles.column}>
          <Text className={styles.label}>{item.label}</Text>

          <Card>
            <CardHeader image={<Code24Regular />} header={<Text weight="semibold">Code</Text>} />
            <pre className={styles.codeBlock}>{item.code}</pre>
          </Card>

          {item.result && (
            <Card>
              <CardHeader
                image={<DocumentText24Regular />}
                header={<Text weight="semibold">Result</Text>}
              />
              <div className={styles.resultBlock}>{item.result}</div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}
