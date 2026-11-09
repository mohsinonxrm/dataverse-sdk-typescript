import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  Field,
  Option,
  Radio,
  RadioGroup,
  Toast,
  ToastTitle,
  useToastController,
} from "@fluentui/react-components";
import type { DiscoveredEnvironment } from "@mohsinonxrm/dataverse-sdk-discovery";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { TOASTER_ID } from "../components/toaster";
import { snippet } from "../lib/snippet";
import * as discovery from "../scenarios/discovery";
import source from "../scenarios/discovery.ts?raw";
import { useSdkContext } from "../sdk/SdkProvider";

const REGIONS = [
  { value: "", label: "All regions" },
  { value: "NA", label: "North America (NA)" },
  { value: "EUR", label: "Europe (EUR)" },
  { value: "APJ", label: "Asia Pacific (APJ)" },
  { value: "UK", label: "United Kingdom (UK)" },
];

export default function DiscoveryPage() {
  const { connection, setEnvironmentUrl } = useSdkContext();
  const { dispatchToast } = useToastController(TOASTER_ID);
  const [region, setRegion] = useState("");
  const [environments, setEnvironments] = useState<DiscoveredEnvironment[]>([]);
  const [selected, setSelected] = useState("");

  const use = (url: string) => {
    setEnvironmentUrl(url);
    dispatchToast(
      <Toast>
        <ToastTitle>Every scenario now uses {new URL(url).host}</ToastTitle>
      </Toast>,
      { intent: "success" }
    );
  };

  return (
    <ScenarioPage
      title="Environments"
      description="DiscoveryClient asks the Global Discovery Service for the environments you can open. Test one, then switch the whole app to it; the header shows which environment is in use."
    >
      <Scenario
        title="Discover environments"
        description="listOrganizations() with an optional region filter, summarised with toEnvironment()."
        code={snippet(source, "discover")}
        run={(sdk, signal) => discovery.listEnvironments(sdk, { region }, signal)}
        onResult={(list) => {
          setEnvironments(list);
          if (!list.some((e) => e.url === selected)) setSelected(list[0]?.url ?? "");
        }}
        renderResult={(list) => (
          <RecordsGrid<DiscoveredEnvironment>
            label="Environments"
            rows={list}
            getRowId={(e) => e.id}
            columns={[
              { key: "name", label: "Name" },
              { key: "url", label: "URL" },
              { key: "region", label: "Region" },
              { key: "version", label: "Version" },
              {
                key: "enabled",
                label: "State",
                render: (e) => (
                  <Badge appearance="tint" color={e.enabled ? "success" : "subtle"} shape="rounded">
                    {e.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                ),
              },
              {
                key: "use",
                label: "",
                render: (e) =>
                  e.url === connection.environmentUrl ? (
                    <Badge appearance="outline" color="brand" shape="rounded">
                      In use
                    </Badge>
                  ) : (
                    <Button
                      size="small"
                      appearance="subtle"
                      disabled={!e.enabled}
                      onClick={() => use(e.url)}
                    >
                      Use
                    </Button>
                  ),
              },
            ]}
          />
        )}
      >
        <Field label="Region">
          <Dropdown
            value={REGIONS.find((r) => r.value === region)?.label ?? ""}
            selectedOptions={[region]}
            onOptionSelect={(_, d) => setRegion(d.optionValue ?? "")}
          >
            {REGIONS.map((r) => (
              <Option key={r.value || "all"} value={r.value}>
                {r.label}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </Scenario>

      <Scenario
        title="Test a connection"
        description="WhoAmI and RetrieveVersion against the environment you pick, with a client and token for it."
        code={snippet(source, "test-connection")}
        run={(sdk, signal) => discovery.testConnection(sdk, { url: selected }, signal)}
        disabledReason={selected ? undefined : "Discover the environments first."}
      >
        <Field label="Environment">
          {environments.length ? (
            <RadioGroup value={selected} onChange={(_, d) => setSelected(d.value)}>
              {environments.map((e) => (
                <Radio key={e.id} value={e.url} label={`${e.name} (${new URL(e.url).host})`} />
              ))}
            </RadioGroup>
          ) : (
            <Dropdown disabled placeholder="Discover the environments first" />
          )}
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}
