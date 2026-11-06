/**
 * #300: type tests (tsd) for what `client.execute()` resolves, one per kind of return type, on real
 * actions. A collection is the array (not `{ value }`), a complex type is the body itself, an
 * entity is the record (with its annotations) or `null` for a 204, and no return type is `void`.
 */
import { expectAssignable, expectError, expectType } from "tsd";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  ExecuteWorkflowAction,
  ExportSolutionAction,
  InstantiateTemplateAction,
  PublishAllXmlAction,
  type ExecuteWorkflowResponse,
  type ExportSolutionResponse,
  type InstantiateTemplateResponse,
} from "../src/index.js";

declare const client: DataverseClient;
const EMPTY = "00000000-0000-0000-0000-000000000000";

// No return type: nothing
expectType<Promise<void>>(client.execute(new PublishAllXmlAction()));

// A collection of any table (Collection(mscrm.crmbaseentity)): the records, not EntityReferences
const emails = await client.execute(
  new InstantiateTemplateAction({ TemplateId: EMPTY, ObjectType: "account", ObjectId: EMPTY })
);
expectType<InstantiateTemplateResponse>(emails);
expectType<unknown>(emails[0]?.subject);
expectType<string | undefined>(emails[0]?.["@odata.etag"]);
expectError(emails.value);

// A complex type: the body itself, with @odata.context
const exported = await client.execute(
  new ExportSolutionAction({ SolutionName: "Contoso", Managed: false })
);
expectType<ExportSolutionResponse>(exported);
expectType<string>(exported.ExportSolutionFile);
expectType<string | undefined>(exported["@odata.context"]);
expectError(exported.value);

// A typed entity (mscrm.asyncoperation): the record with its annotations, or null for a 204
const job = await client.execute(new ExecuteWorkflowAction(EMPTY, { EntityId: EMPTY }));
expectType<ExecuteWorkflowResponse>(job);
expectAssignable<ExecuteWorkflowResponse>(null);
expectType<string | undefined>(job?.asyncoperationid);
expectType<string | undefined>(job?.["@odata.etag"]);
