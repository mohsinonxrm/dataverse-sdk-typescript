import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { snippet } from "../lib/snippet";
import * as xrm from "../scenarios/xrm";
import source from "../scenarios/xrm.ts?raw";

export default function XrmPage() {
  return (
    <ScenarioPage
      title="OrganizationService"
      description="@mohsinonxrm/dataverse-sdk-xrm gives the C# SDK's IOrganizationService shape over the Web API: create, retrieve, update, delete, retrieveMultiple, associate, setState and execute."
    >
      <Scenario
        title="Create, retrieve, update, associate, delete"
        description="An account and a contact through OrganizationService. Both are deleted afterwards."
        code={snippet(source, "xrm-crud")}
        run={(sdk) => xrm.organizationServiceCrud(sdk)}
      />
      <Scenario
        title="whoAmI() and execute()"
        description="execute() runs a typed request from the actions, functions or messages packages."
        code={snippet(source, "xrm-execute")}
        run={(sdk) => xrm.organizationServiceExecute(sdk)}
      />
    </ScenarioPage>
  );
}
