import { useEffect } from "react";
import type { ReactNode } from "react";
import { Body1, makeStyles, Title2, tokens } from "@fluentui/react-components";
import { APP_NAME } from "../config";
import { PAGE_MAX_WIDTH, TEXT_MAX_WIDTH } from "../theme/layout";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
    width: "100%",
    maxWidth: PAGE_MAX_WIDTH,
    marginInline: "auto",
    minWidth: 0,
  },
  header: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  title: { margin: 0 },
  description: { color: tokens.colorNeutralForeground2, maxWidth: TEXT_MAX_WIDTH },
});

interface ScenarioPageProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
}

/** A page of scenarios: a heading, a short introduction, then one card per scenario. */
export function ScenarioPage({ title, description, children }: ScenarioPageProps) {
  const styles = useStyles();
  useEffect(() => {
    document.title = `${title} · ${APP_NAME}`;
  }, [title]);
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Title2 as="h1" className={styles.title}>
          {title}
        </Title2>
        <Body1 className={styles.description}>{description}</Body1>
      </header>
      {children}
    </div>
  );
}
