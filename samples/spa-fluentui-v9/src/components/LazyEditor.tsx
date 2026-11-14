import { Component, lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { editorHeight, lineCount, type CodeEditorProps } from "../editor/types";

// Monaco and the editor component: a chunk of their own, downloaded the first time an editor
// renders (not with the app, the sign-in page or the first paint).
const CodeEditor = lazy(() => import("../editor/CodeEditor"));

const useStyles = makeStyles({
  skeleton: { display: "block", width: "100%" },
});

class LoadBoundary extends Component<{ fallback: ReactNode; children: ReactNode }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    console.warn("The code editor didn't load; showing plain text instead.", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The code editor, loaded on first use: a skeleton of the same height while Monaco downloads, and
 * `fallback` (plain text) if it can't be loaded.
 */
export function LazyEditor({ fallback, ...props }: CodeEditorProps & { fallback: ReactNode }) {
  const styles = useStyles();
  const lines = Math.min(
    props.maxLines ?? 22,
    Math.max(props.minLines ?? 1, lineCount(props.value))
  );
  return (
    <LoadBoundary fallback={fallback}>
      <Suspense
        fallback={
          <Skeleton className={styles.skeleton} aria-label={`Loading the editor: ${props.label}`}>
            <SkeletonItem shape="rectangle" style={{ height: `${editorHeight(lines)}px` }} />
          </Skeleton>
        }
      >
        <CodeEditor {...props} />
      </Suspense>
    </LoadBoundary>
  );
}
