/**
 * #344: type tests (tsd) for the function-backed and hand-written messages.
 */
import { expectAssignable, expectError, expectType } from "tsd";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import {
  CheckPrivilegeRequest,
  CheckPrivilegeResponse,
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  ExecuteMultipleRequest,
  ExecuteMultipleResponse,
  ExecuteTransactionRequest,
  ExecuteTransactionResponse,
  OrganizationRequest,
  RetrieveEntityRequest,
  RetrieveMultipleRequest,
  RetrievePrincipalAccessRequest,
  RetrievePrincipalAccessResponse,
  RetrieveRequest,
  UpdateRequest,
  UpsertRequest,
  UpsertResponse,
  WhoAmIRequest,
  WhoAmIResponse,
  createEntityReference,
  type EntityReference,
  type ExecuteMultipleResponseItem,
  type PrivilegeDepthName,
  type RetrieveMultipleResult,
  type RetrieveResult,
  type WhoAmIResult,
} from "../src/index.js";

declare function execute<T>(request: Executable<T>): Promise<T>;

const account = createEntityReference("account", "00000000-0000-0000-0000-000000000001");

// A function-backed message is an OrganizationRequest whose result is the function's value
const whoAmI = new WhoAmIRequest();
expectAssignable<OrganizationRequest>(whoAmI);
expectType<WhoAmIResponse>(await execute(whoAmI));
expectType<WhoAmIResult>((await execute(whoAmI)).result);
expectType<string>((await execute(whoAmI)).result.UserId);
new RetrieveEntityRequest({
  EntityFilters: "Entity",
  MetadataId: "00000000-0000-0000-0000-000000000000",
  RetrieveAsIfPublished: false,
});
expectError(new RetrieveEntityRequest({ EntityFilters: "Entity", RetrieveAsIfPublished: false }));

// CRUD
expectType<string>((await execute(new CreateRequest({ Target: { "@odata.type": "x", n: 1 } }))).id);
expectError(new CreateRequest({ Target: { name: "no table" } }));
expectType<RetrieveResult>(
  (await execute(new RetrieveRequest({ Target: account, ColumnSet: ["name"] }))).Entity
);
expectError(new RetrieveRequest({ Target: { logicalName: "account", id: "1" } }));
new UpdateRequest({ Target: account, Attributes: { name: "New", revenue: 5 }, ETag: 'W/"1"' });
expectError(new UpdateRequest({ Target: account }));
new DeleteRequest({ Target: account });
expectType<RetrieveMultipleResult>(
  (await execute(new RetrieveMultipleRequest({ Query: "<fetch />" }))).EntityCollection
);

// ExecuteTransaction: each response typed by its request's position
const transaction = await execute(
  new ExecuteTransactionRequest({
    Requests: [
      new CreateRequest({ Target: { "@odata.type": "a" } }),
      new DeleteRequest({ Target: account }),
    ],
  })
);
expectAssignable<ExecuteTransactionResponse<readonly unknown[]>>(transaction);
expectType<CreateResponse>(transaction.Responses[0]);

// ExecuteMultiple: an item's Response is one of the requests' responses
const multiple = await execute(
  new ExecuteMultipleRequest({
    Requests: [new WhoAmIRequest(), new CreateRequest({ Target: { "@odata.type": "a" } })],
  })
);
expectAssignable<ExecuteMultipleResponse>(multiple);
expectType<boolean>(multiple.IsFaulted);
expectAssignable<ExecuteMultipleResponseItem<WhoAmIResponse | CreateResponse>>(
  multiple.Responses[0]
);
expectError(new ExecuteMultipleRequest({ Requests: [{ name: "not a request" }] }));

// Upsert (#435): a GUID or an alternate key; the response says whether it created the record
const upsert = await execute(
  new UpsertRequest({
    Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" },
    Key: { accountnumber: "A-1" },
  })
);
expectType<UpsertResponse>(upsert);
expectType<boolean>(upsert.RecordCreated);
expectType<EntityReference>(upsert.Target);
new UpsertRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "1" } });
expectError(new UpsertRequest({ Target: { name: "no table" }, Key: "1" }));
expectError(new UpsertRequest({ Target: { "@odata.type": "a" }, Key: { n: { nested: 1 } } }));

// RetrievePrincipalAccess (#435): the principal is a reference; the rights are a number
const access = await execute(
  new RetrievePrincipalAccessRequest({
    Principal: createEntityReference("systemuser", "00000000-0000-0000-0000-000000000002"),
    Target: account,
  })
);
expectType<RetrievePrincipalAccessResponse>(access);
expectType<number>(access.AccessRights);
expectType<string | number>(access.result.AccessRights);
expectError(new RetrievePrincipalAccessRequest({ Target: account }));
expectError(
  new RetrievePrincipalAccessRequest({
    Principal: { logicalName: "team", id: "1" },
    Target: account,
  })
);

// CheckPrivilege (#435)
const privilege = await execute(
  new CheckPrivilegeRequest({ UserId: "1", PrivilegeName: "prvCreateAccount", Depth: "Local" })
);
expectType<CheckPrivilegeResponse>(privilege);
expectType<boolean>(privilege.HasPrivilege);
expectType<PrivilegeDepthName | undefined>(privilege.Depth);
new CheckPrivilegeRequest({ UserId: "1", PrivilegeName: "p", Depth: 3 });
expectError(new CheckPrivilegeRequest({ UserId: "1", PrivilegeName: "p", Depth: "Everywhere" }));
expectError(new CheckPrivilegeRequest({ UserId: "1" }));
