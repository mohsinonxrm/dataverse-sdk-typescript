import { makeStyles, Spinner, Text, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    gap: "16px",
  },
  text: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
});

interface LoadingStateProps {
  label?: string;
  size?: "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge";
}

/**
 * LoadingState Component
 *
 * Displays a centered loading spinner with optional label.
 *
 * @example
 * ```tsx
 * if (loading) {
 *   return <LoadingState label="Loading accounts..." size="large" />;
 * }
 * ```
 */
export function LoadingState({ label = "Loading...", size = "large" }: LoadingStateProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Spinner size={size} />
      <Text className={styles.text}>{label}</Text>
    </div>
  );
}
