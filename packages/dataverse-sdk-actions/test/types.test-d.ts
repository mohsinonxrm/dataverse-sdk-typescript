/**
 * #96: type tests (tsd) for the options-object constructors. Required properties follow the CSDL
 * `Nullable="false"`, the others are optional, and positional arguments don't compile.
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import {
  ImportSolutionAction,
  type ImportSolutionActionParameters,
} from "../src/ImportSolutionAction.js";
import { AddMembersTeamAction } from "../src/AddMembersTeamAction.js";
import { CreateMultipleAction } from "../src/CreateMultipleAction.js";
import { PublishAllXmlAction } from "../src/PublishAllXmlAction.js";
import { createEntityReference } from "../src/index.js";

const required = {
  CustomizationFile: "UEsDBA==",
  ImportJobId: "00000000-0000-0000-0000-000000000001",
  OverwriteUnmanagedCustomizations: true,
  PublishWorkflows: false,
};

// ImportSolution: the four Nullable="false" parameters are required, the 13 others optional
new ImportSolutionAction(required);
new ImportSolutionAction({ ...required, ConvertToManaged: true, HoldingSolution: undefined });
expectAssignable<ImportSolutionActionParameters>(required);
expectNotAssignable<ImportSolutionActionParameters>({ ...required, ImportJobId: undefined });
expectError(new ImportSolutionAction({ CustomizationFile: "x", ImportJobId: "y" }));
expectError(new ImportSolutionAction({ ...required, PublishWorkflows: "no" }));
// A misspelled property is an excess property
expectError(new ImportSolutionAction({ ...required, ConvertToManage: true }));
// The 1.0 positional form
expectError(new ImportSolutionAction(true, false, "UEsDBA==", "id"));
expectType<ImportSolutionActionParameters>(new ImportSolutionAction(required).parameters);
expectType<boolean | undefined>(new ImportSolutionAction(required).parameters.ConvertToManaged);

// A bound action: the record id first, then the parameters
const member = createEntityReference("systemuser", "00000000-0000-0000-0000-000000000002");
new AddMembersTeamAction("00000000-0000-0000-0000-000000000003", { Members: [member] });
expectType<string>(new AddMembersTeamAction("t1", { Members: [] }).teamId);
expectError(new AddMembersTeamAction({ Members: [member] }));
expectError(new AddMembersTeamAction("t1"));
expectError(new AddMembersTeamAction("t1", [member]));

// Collection(crmbaseentity): the entity set first
new CreateMultipleAction("accounts", {
  Targets: [{ "@odata.type": "Microsoft.Dynamics.CRM.account" }],
});
expectError(new CreateMultipleAction("accounts", []));

// No parameters: no arguments
new PublishAllXmlAction();
