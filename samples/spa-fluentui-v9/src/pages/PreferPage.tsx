import { useState } from "react";
import { Field, Input, SpinButton } from "@fluentui/react-components";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { spinValue } from "../lib/fields";
import { snippet } from "../lib/snippet";
import * as writes from "../scenarios/writes";
import source from "../scenarios/writes.ts?raw";

export default function PreferPage() {
  const [name, setName] = useState("Fabrikam Outlet");
  const [pageSize, setPageSize] = useState(4);

  return (
    <ScenarioPage
      title="Prefer headers"
      description="prefer() builds the Prefer header: return=representation, formatted values and other annotations, and the page size. What Dataverse applied is in the Preference-Applied response header (open a request below)."
    >
      <Scenario
        title="return=representation"
        description="The create answers 201 with the record and its formatted values, so no second request is needed. The record is deleted afterwards."
        code={snippet(source, "return-representation")}
        run={(sdk, signal) => writes.createAndReturn(sdk, { name }, signal)}
      >
        <Field label="Name">
          <Input value={name} onChange={(_, d) => setName(d.value)} />
        </Field>
      </Scenario>
      <Scenario
        title="odata.maxpagesize"
        description="The page size for this request. The response has @odata.nextLink when there are more records."
        code={snippet(source, "max-page-size")}
        run={(sdk, signal) => writes.firstPage(sdk, { pageSize }, signal)}
      >
        <Field label="Page size">
          <SpinButton
            value={pageSize}
            min={1}
            max={50}
            onChange={(_, d) => setPageSize(spinValue(d, 4))}
          />
        </Field>
      </Scenario>
      <Scenario
        title="odata.include-annotations"
        description='allAnnotations() asks for every annotation: formatted values, lookup logical names and navigation property names, as "column@annotation" properties.'
        code={snippet(source, "all-annotations")}
        run={(sdk, signal) => writes.withAnnotations(sdk, signal)}
      />
    </ScenarioPage>
  );
}
