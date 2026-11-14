import { useState } from "react";
import {
  Caption1,
  Dropdown,
  Field,
  makeStyles,
  Option,
  OptionGroup,
  tokens,
} from "@fluentui/react-components";
import type { DiscoveredEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { useAuth } from "../../auth/AuthProvider";
import type { AuthSession } from "../../auth/session";
import { normalizeUrl, validateEnvironmentUrl } from "../../config";
import { useSdkContext } from "../../sdk/SdkProvider";
import { useCommonStyles } from "../../theme/styles";

const useStyles = makeStyles({
  dropdown: { minWidth: "14rem", maxWidth: "100%" },
  option: { display: "flex", flexDirection: "column", minWidth: 0 },
  host: { color: tokens.colorNeutralForeground3 },
});

/** Option values that aren't environments. */
const ALL = "all-environments";
const STATUS = "status";

type Discovery =
  | { status: "idle" | "loading" }
  | { status: "loaded"; environments: DiscoveredEnvironment[] }
  | { status: "failed" };

// One Global Discovery call per account for the session: the list doesn't change while it runs.
const discovered = new Map<string, Promise<DiscoveredEnvironment[]>>();

async function discover(session: AuthSession, lastUsed: string): Promise<DiscoveredEnvironment[]> {
  let entry = discovered.get(session.accountId);
  if (!entry) {
    // Loaded with the dropdown's first opening, not with the page.
    entry = import("../../auth/environments").then((m) =>
      m.discoverEnvironments(session, { lastUsed })
    );
    discovered.set(session.accountId, entry);
    entry.catch(() => discovered.delete(session.accountId));
  }
  return entry;
}

const same = (a: string, b: string) =>
  normalizeUrl(a).toLowerCase() === normalizeUrl(b).toLowerCase();

/**
 * The explorer's environment dropdown: the signed-in user's environments from the Global
 * Discovery Service (demo mode's fake one in demo mode), listed the first time it opens.
 * Choosing one switches the app's client to it; `onSwitch` is told, and the request being built
 * stays as it is. "All environments…" opens the full picker.
 */
export function EnvironmentSwitcher({ onSwitch }: { onSwitch: (url: string) => void }) {
  const styles = useStyles();
  const common = useCommonStyles();
  const { session, connection, setEnvironmentUrl } = useSdkContext();
  const { switchEnvironment } = useAuth();
  const current = connection.environmentUrl;
  const host = new URL(current).host;
  const [discovery, setDiscovery] = useState<Discovery>({ status: "idle" });

  const load = () => {
    if (discovery.status === "loading" || discovery.status === "loaded") return;
    setDiscovery({ status: "loading" });
    discover(session, current).then(
      (environments) => setDiscovery({ status: "loaded", environments }),
      () => setDiscovery({ status: "failed" })
    );
  };

  const environments = discovery.status === "loaded" ? discovery.environments : [];
  const known = environments.find((e) => same(e.url, current));
  const choose = (value: string | undefined) => {
    if (!value || value === STATUS) return;
    if (value === ALL) {
      switchEnvironment();
      return;
    }
    if (same(value, current)) return;
    setEnvironmentUrl(value);
    onSwitch(normalizeUrl(value));
  };

  return (
    <Field label="Environment">
      <Dropdown
        className={styles.dropdown}
        value={known?.name ?? host}
        selectedOptions={[normalizeUrl(current)]}
        onOpenChange={(_, d) => d.open && load()}
        onOptionSelect={(_, d) => choose(d.optionValue)}
      >
        {!known && (
          <Option value={normalizeUrl(current)} text={host}>
            {host}
          </Option>
        )}
        {environments.map((e) => {
          // As canChoose(): enabled, and a URL the site's CSP lets it call.
          const usable = e.enabled && validateEnvironmentUrl(e.url) === undefined;
          const eHost = new URL(e.url).host;
          return (
            <Option key={e.id} value={normalizeUrl(e.url)} text={e.name} disabled={!usable}>
              <span className={styles.option}>
                <span>{e.name}</span>
                <Caption1 className={styles.host}>
                  <span className={common.mono}>{eHost}</span>
                  {e.enabled ? "" : " · disabled"}
                </Caption1>
              </span>
            </Option>
          );
        })}
        {(discovery.status === "idle" || discovery.status === "loading") && (
          <Option value={STATUS} text="Finding your environments…" disabled>
            Finding your environments…
          </Option>
        )}
        {discovery.status === "failed" && (
          <Option value={STATUS} text="Your environments couldn't be listed" disabled>
            Your environments couldn&apos;t be listed
          </Option>
        )}
        <OptionGroup label="More">
          <Option value={ALL} text="All environments…">
            All environments…
          </Option>
        </OptionGroup>
      </Dropdown>
    </Field>
  );
}
