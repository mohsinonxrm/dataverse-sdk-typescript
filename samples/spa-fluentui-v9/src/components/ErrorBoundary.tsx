import { Component, lazy, Suspense } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Body1, Button, makeStyles, Subtitle2, tokens } from "@fluentui/react-components";
import { ArrowClockwiseRegular } from "@fluentui/react-icons";
// The card knows the SDK's error classes; load it only when something has failed.
const ErrorCard = lazy(() => import("./ErrorCard").then((m) => ({ default: m.ErrorCard })));

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    alignItems: "flex-start",
  },
});

function Fallback({
  title,
  error,
  onRetry,
}: {
  title: string;
  error: unknown;
  onRetry: () => void;
}) {
  const styles = useStyles();
  return (
    <div role="alert" className={styles.root}>
      <Subtitle2 as="h2">{title}</Subtitle2>
      <Suspense fallback={<Body1>{error instanceof Error ? error.message : String(error)}</Body1>}>
        <ErrorCard error={error} />
      </Suspense>
      <Button icon={<ArrowClockwiseRegular />} onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

interface Props {
  children: ReactNode;
  /** Shown above the error, e.g. "This page failed to render". */
  title?: string;
}

interface State {
  error: unknown;
}

/**
 * Catches render errors (and failed lazy route loads) below it and shows them as an error card
 * with a way to try again, instead of a blank page. Give it a `key` that changes on navigation
 * so a new page starts clean.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: undefined };

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    // Kept for the browser's developer tools; the card shows the same error.
    console.warn("Render error caught by ErrorBoundary", error, info.componentStack);
  }

  render() {
    if (this.state.error === undefined) return this.props.children;
    return (
      <Fallback
        title={this.props.title ?? "Something went wrong while showing this page."}
        error={this.state.error}
        onRetry={() => this.setState({ error: undefined })}
      />
    );
  }
}
