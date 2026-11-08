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
import { REPO_URL } from "../config";
import { DOC_LINKS, type DocSection } from "../docs";
import { SAMPLES } from "../explorer/samples";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  card: { padding: tokens.spacingHorizontalL, gap: tokens.spacingVerticalM },
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

/** Links to the SDK's documentation in the repository, and into the explorer. */
export default function DocsPage() {
  const styles = useStyles();
  return (
    <ScenarioPage
      title="Documentation"
      description={
        <>
          The guides and the API reference live with the source on{" "}
          <Link href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          . Each API reference is the package&apos;s API Extractor report: every exported class,
          function and type with its signature.
        </>
      }
    >
      <div className={styles.grid}>
        {SECTIONS.map((section) => (
          <Card
            key={section}
            className={styles.card}
            role="region"
            aria-labelledby={`docs-${section}`}
          >
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
        <Card className={styles.card} role="region" aria-labelledby="docs-try">
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
