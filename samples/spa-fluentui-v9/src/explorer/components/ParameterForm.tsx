import {
  Caption1,
  Field,
  Input,
  makeStyles,
  Select,
  Textarea,
  tokens,
} from "@fluentui/react-components";
import type { CatalogOperation, OperationInput } from "../types";
import { inputKind, placeholderFor } from "../values";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalM,
    alignItems: "start",
  },
  type: { fontFamily: tokens.fontFamilyMonospace, overflowWrap: "anywhere" },
  muted: { color: tokens.colorNeutralForeground3 },
  mono: { fontFamily: tokens.fontFamilyMonospace },
});

interface ParameterFormProps {
  op: CatalogOperation;
  input: OperationInput;
  onChange: (input: OperationInput) => void;
  /** What's wrong with the value of a field, by field name. */
  errors: Record<string, string>;
}

/** The constructor arguments and parameters of a typed operation, one field each. */
export function ParameterForm({ op, input, onChange, errors }: ParameterFormProps) {
  const styles = useStyles();
  const params = op.parameters ?? [];
  if (!op.args.length && !params.length) {
    return <Caption1 className={styles.muted}>{op.className} takes no parameters.</Caption1>;
  }
  const messageFor = (name: string) => errors[name];
  const setArg = (name: string, value: string) =>
    onChange({ ...input, args: { ...input.args, [name]: value } });
  const setParam = (name: string, value: string) =>
    onChange({ ...input, parameters: { ...input.parameters, [name]: value } });

  return (
    <div className={styles.grid}>
      {op.args.map((arg) => (
        <Field
          key={`arg-${arg.name}`}
          label={arg.name}
          required
          validationMessage={messageFor(arg.name)}
          hint={
            arg.name === "entitySetName"
              ? "The entity set to call it on, e.g. accounts"
              : "The id (GUID) of the record to call it on"
          }
        >
          <Input
            className={styles.mono}
            value={input.args[arg.name] ?? ""}
            onChange={(_, d) => setArg(arg.name, d.value)}
            spellCheck={false}
          />
        </Field>
      ))}
      {params.map((p) => {
        const value = input.parameters[p.name] ?? "";
        const kind = inputKind(p.type);
        const hint = <span className={styles.type}>{p.type}</span>;
        return (
          <Field
            key={p.name}
            label={p.name}
            required={!p.optional}
            hint={hint}
            validationMessage={messageFor(p.name)}
          >
            {kind === "boolean" ? (
              <Select value={value} onChange={(_, d) => setParam(p.name, d.value)}>
                <option value="">{p.optional ? "(not sent)" : "(choose)"}</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            ) : kind === "json" ? (
              <Textarea
                className={styles.mono}
                value={value}
                onChange={(_, d) => setParam(p.name, d.value)}
                placeholder={placeholderFor(p.type)}
                resize="vertical"
                spellCheck={false}
              />
            ) : (
              <Input
                className={styles.mono}
                value={value}
                inputMode={kind === "number" ? "decimal" : undefined}
                onChange={(_, d) => setParam(p.name, d.value)}
                spellCheck={false}
              />
            )}
          </Field>
        );
      })}
    </div>
  );
}
