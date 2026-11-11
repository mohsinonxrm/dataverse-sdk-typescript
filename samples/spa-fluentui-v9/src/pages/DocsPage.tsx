import {
  Caption1,
  Card,
  CardHeader,
  Link,
  makeStyles,
  Subtitle1,
  tokens,
} from "@fluentui/react-components";
import { RouterLink } from "../components/RouterLink";
import { ScenarioPage } from "../components/ScenarioPage";
import { DOCS_URL } from "../config";
import { DOC_LINKS, type DocSection } from "../docs";
import { SAMPLES } from "../explorer/samples";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))",
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  list: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  summary: { display: "block", color: tokens.colorNeutralForeground3 },
});

const SECTIONS: DocSection[] = ["Guides", "Operations", "API reference"];

/** Links into the SDK's documentation site, and into the explorer. */
export default function DocsPage() {
  const styles = useStyles();
  return (
    <ScenarioPage
      title="Documentation"
      description={
        <>
          The guides, a page per package and the API reference are on the{" "}
          <Link href={`${DOCS_URL}/`} target="_blank" rel="noreferrer">
            documentation site
          </Link>
          , with search and the SDK&apos;s types on hover in the code samples. Each API reference
          lists every exported class, function and type with its signature.
        </>
      }
    >
      <div className={styles.grid}>
        {SECTIONS.map((section) => (
          <Card key={section} size="large" role="region" aria-labelledby={`docs-${section}`}>
            <CardHeader
              header={
                <Subtitle1 as="h2" id={`docs-${section}`}>
                  {section}
                </Subtitle1>
              }
            />
            <ul className={styles.list}>
              {DOC_LINKS.filter((d) => d.section === section).map((d) => (
                <li key={d.href}>
                  <Link href={d.href} target="_blank" rel="noreferrer">
                    {d.title}
                  </Link>
                  <Caption1 className={styles.summary}>{d.summary}</Caption1>
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <Card size="large" role="region" aria-labelledby="docs-try">
          <CardHeader
            header={
              <Subtitle1 as="h2" id="docs-try">
                Try it in the explorer
              </Subtitle1>
            }
          />
          <ul className={styles.list}>
            {SAMPLES.map((s) => (
              <li key={s.id}>
                <RouterLink to={`/explorer?sample=${s.id}`}>{s.title}</RouterLink>
                <Caption1 className={styles.summary}>{s.group}</Caption1>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </ScenarioPage>
  );
}
