import { useState } from "react";
import {
  Button,
  createFocusOutlineStyle,
  Field,
  makeStyles,
  mergeClasses,
  Textarea,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import { TextIndentIncreaseRegular } from "@fluentui/react-icons";
import type { EditorApi, EditorProblem } from "../editor/types";
import { LazyEditor } from "./LazyEditor";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS, minWidth: 0 },
  // Looks like a Fluent input: outlined, with the accessible bottom stroke.
  input: {
    minWidth: 0,
    overflow: "hidden",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: tokens.colorNeutralStrokeAccessible,
    ...createFocusOutlineStyle({
      selector: "focus-within",
      style: { outlineOffset: `calc(${tokens.strokeWidthThick} * -1)` },
    }),
  },
  invalid: {
    borderTopColor: tokens.colorPaletteRedBorder2,
    borderRightColor: tokens.colorPaletteRedBorder2,
    borderBottomColor: tokens.colorPaletteRedBorder2,
    borderLeftColor: tokens.colorPaletteRedBorder2,
  },
  textarea: { fontFamily: tokens.fontFamilyMonospace, minHeight: "8rem" },
  actions: { display: "flex", justifyContent: "flex-end" },
});

interface JsonEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
}

function describe(problems: EditorProblem[]): string | undefined {
  const [first] = problems;
  if (!first) return undefined;
  const more = problems.length > 1 ? ` (${problems.length - 1} more)` : "";
  return `Line ${first.line}, column ${first.column}: ${first.message}${more}`;
}

/**
 * A JSON field: a Monaco editor with JSON validation, its first problem shown as the field's
 * error, and a Format button (Shift+Alt+F in the editor). Tab moves the focus on, as in any field.
 */
export function JsonEditor({ label, value, onChange, hint, placeholder }: JsonEditorProps) {
  const styles = useStyles();
  const [api, setApi] = useState<EditorApi>();
  const [problems, setProblems] = useState<EditorProblem[]>([]);
  // Problems of text that has since been cleared don't count.
  const error = value.trim() ? describe(problems) : undefined;

  return (
    <div className={styles.root}>
      <Field
        label={label}
        hint={hint}
        validationState={error ? "error" : "none"}
        validationMessage={error}
      >
        {(control) => (
          <div className={mergeClasses(styles.input, error && styles.invalid)}>
            <LazyEditor
              value={value}
              language="json"
              label={label}
              readOnly={false}
              minLines={6}
              maxLines={16}
              placeholder={placeholder}
              describedBy={control["aria-describedby"]}
              invalid={Boolean(error)}
              onChange={onChange}
              onProblems={setProblems}
              onReady={setApi}
              fallback={
                <Textarea
                  {...control}
                  className={styles.textarea}
                  value={value}
                  onChange={(_, d) => onChange(d.value)}
                  placeholder={placeholder}
                  resize="vertical"
                  spellCheck={false}
                />
              }
            />
          </div>
        )}
      </Field>
      <div className={styles.actions}>
        <Tooltip content="Indent the JSON (Shift+Alt+F in the editor)" relationship="description">
          <Button
            size="small"
            icon={<TextIndentIncreaseRegular />}
            disabled={!api || !value.trim() || Boolean(error)}
            onClick={() => {
              api?.format();
              api?.focus();
            }}
          >
            Format
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
