import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ErrorCircle24Regular, Dismiss24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  errorContainer: {
    marginBottom: "16px",
  },
  errorDetails: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "monospace",
    fontSize: "12px",
    overflowX: "auto",
  },
  errorStack: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },
});

interface ErrorDisplayProps {
  error: unknown;
  onDismiss?: () => void;
  onRetry?: () => void;
  showDetails?: boolean;
}

/**
 * ErrorDisplay Component
 *
 * Displays errors with appropriate styling and actions.
 * Shows error message, details, and optional retry/dismiss buttons.
 *
 * @example
 * ```tsx
 * try {
 *   await client.api('/accounts').get();
 * } catch (error) {
 *   setError(error);
 * }
 *
 * return error ? (
 *   <ErrorDisplay
 *     error={error}
 *     onRetry={() => fetchData()}
 *     onDismiss={() => setError(null)}
 *   />
 * ) : null;
 * ```
 */
export function ErrorDisplay({
  error,
  onDismiss,
  onRetry,
  showDetails = false,
}: ErrorDisplayProps) {
  const styles = useStyles();

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  const errorName = error instanceof Error ? error.name : "Error";

  return (
    <div className={styles.errorContainer}>
      <MessageBar intent="error" icon={<ErrorCircle24Regular />}>
        <MessageBarTitle>{errorName}</MessageBarTitle>
        <MessageBarBody>
          {errorMessage}

          {showDetails && errorStack && (
            <div className={styles.errorDetails}>
              <strong>Stack Trace:</strong>
              <div className={styles.errorStack}>{errorStack}</div>
            </div>
          )}

          {(onRetry || onDismiss) && (
            <div className={styles.actions}>
              {onRetry && (
                <Button appearance="primary" onClick={onRetry}>
                  Retry
                </Button>
              )}
              {onDismiss && (
                <Button appearance="subtle" icon={<Dismiss24Regular />} onClick={onDismiss}>
                  Dismiss
                </Button>
              )}
            </div>
          )}
        </MessageBarBody>
      </MessageBar>
    </div>
  );
}
