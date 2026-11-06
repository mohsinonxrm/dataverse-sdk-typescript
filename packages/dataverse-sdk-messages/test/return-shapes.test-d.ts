/**
 * #300: type tests (tsd) for a message's `result`, one per kind of return type, on real messages.
 * `result` is the value the action of the same name returns, with the same type: a collection is
 * the array, a complex type is the body, an entity is the record or `null`. A message without a
 * return type has no `result`.
 */
import { expectAssignable, expectError, expectType } from "tsd";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  ExecuteWorkflowRequest,
  ExportSolutionRequest,
  InstantiateTemplateRequest,
  PublishAllXmlRequest,
  type ExecuteWorkflowResult,
  type ExportSolutionResult,
  type InstantiateTemplateResult,
} from "../src/index.js";

declare const client: DataverseClient;
const EMPTY = "00000000-0000-0000-0000-000000000000";

// No return type: no result
const published = await client.execute(new PublishAllXmlRequest());
expectError(published.result);

// A collection of any table: the records
const emails = await client.execute(
  new InstantiateTemplateRequest({ TemplateId: EMPTY, ObjectType: "account", ObjectId: EMPTY })
);
expectType<InstantiateTemplateResult>(emails.result);
expectType<unknown>(emails.result[0]?.subject);
expectType<string | undefined>(emails.result[0]?.["@odata.etag"]);

// A complex type: the body itself
const exported = await client.execute(
  new ExportSolutionRequest({ SolutionName: "Contoso", Managed: false })
);
expectType<ExportSolutionResult>(exported.result);
expectType<string>(exported.result.ExportSolutionFile);
expectType<string | undefined>(exported.result["@odata.context"]);

// A typed entity: the record with its annotations, or null for a 204
const job = await client.execute(new ExecuteWorkflowRequest(EMPTY, { EntityId: EMPTY }));
expectType<ExecuteWorkflowResult>(job.result);
expectAssignable<ExecuteWorkflowResult>(null);
expectType<string | undefined>(job.result?.asyncoperationid);
