/**
 * #300: type tests (tsd) for what `client.execute()` resolves, one per kind of return type, on real
 * functions. A primitive or a collection is the `value` of the body (not `{ value }`), a complex
 * type is the body itself, and an entity is the record (with its annotations) or `null` for a 204.
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  CalculateRollupFieldFunction,
  createEntityReference,
  GetAllTimeZonesWithDisplayNameFunction,
  GetPreferredSolutionFunction,
  GetTimeZoneCodeByLocalizedNameFunction,
  RetrieveDependentComponentsFunction,
  WhoAmIFunction,
  type CalculateRollupFieldResponse,
  type GetAllTimeZonesWithDisplayNameResponse,
  type GetPreferredSolutionResponse,
  type GetTimeZoneCodeByLocalizedNameResponse,
  type RetrieveDependentComponentsResponse,
  type WhoAmIResponse,
} from "../src/index.js";

declare const client: DataverseClient;
const EMPTY = "00000000-0000-0000-0000-000000000000";

// No function returns a primitive: the only ones in the CSDL (Edm.Boolean) are the $filter query
// functions, which are queryFunctions helpers, not classes (#342; query-functions.test-d.ts).

// A collection of a typed entity (Collection(mscrm.dependency)): the records, each with its etag
const dependencies = await client.execute(
  new RetrieveDependentComponentsFunction({ ObjectId: EMPTY, ComponentType: 1 })
);
expectType<RetrieveDependentComponentsResponse>(dependencies);
expectAssignable<unknown[]>(dependencies);
expectType<number | undefined>(dependencies[0]?.dependencytype);
expectType<string | undefined>(dependencies[0]?.["@odata.etag"]);
expectError(dependencies.value);

// A collection of any table (Collection(mscrm.crmbaseentity)): records, columns unknown
const zones = await client.execute(new GetAllTimeZonesWithDisplayNameFunction({ LocaleId: 1033 }));
expectType<GetAllTimeZonesWithDisplayNameResponse>(zones);
expectType<unknown>(zones[0]?.timezonecode);
expectType<string | undefined>(zones[0]?.["@odata.type"]);
expectError(zones.value);

// A complex type: the body itself, with @odata.context
const who = await client.execute(new WhoAmIFunction());
expectType<WhoAmIResponse>(who);
expectType<string>(who.UserId);
expectType<string | undefined>(who["@odata.context"]);
const tz = await client.execute(
  new GetTimeZoneCodeByLocalizedNameFunction({
    LocalizedStandardName: "Pacific Standard Time",
    LocaleId: 1033,
  })
);
expectType<GetTimeZoneCodeByLocalizedNameResponse>(tz);
expectType<number>(tz.TimeZoneCode);
expectError(tz.value);

// An entity (mscrm.crmbaseentity): the record with its annotations, or null for a 204
const solution = await client.execute(new GetPreferredSolutionFunction());
expectType<GetPreferredSolutionResponse>(solution);
expectAssignable<GetPreferredSolutionResponse>(null);
expectNotAssignable<NonNullable<GetPreferredSolutionResponse>>(null);
expectType<string | undefined>(solution?.["@odata.etag"]);
expectType<string | undefined>(solution?.["@odata.type"]);
expectType<unknown>(solution?.solutionid);
const rollup = await client.execute(
  new CalculateRollupFieldFunction({
    Target: createEntityReference("account", EMPTY),
    FieldName: "new_rollup",
  })
);
expectType<CalculateRollupFieldResponse>(rollup);
expectAssignable<CalculateRollupFieldResponse>(null);
