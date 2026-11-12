/**
 * #381: type tests (tsd) for what `listOrganizations()` resolves. With `select`, only the selected
 * properties come back, so the rows are `Pick<OrganizationDetail, K>`, not full rows.
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import { OrganizationState, OrganizationType, toEnvironment } from "../src/index.js";
import type { DiscoveryClient, DiscoveryOptions, OrganizationDetail } from "../src/index.js";

declare const discovery: DiscoveryClient;

// No select: full rows
expectType<OrganizationDetail[]>(await discovery.listOrganizations());
expectType<OrganizationDetail[]>(await discovery.listOrganizations({ filter: "State eq 0" }));

// select: just the selected properties
const picked = await discovery.listOrganizations({ select: ["FriendlyName", "ApiUrl"] });
expectType<Array<Pick<OrganizationDetail, "FriendlyName" | "ApiUrl">>>(picked);
expectType<string>(picked[0].ApiUrl);
expectError(picked[0].Url);

// A readonly (`as const`) list works too
const names = ["UniqueName", "Url"] as const;
expectType<Array<Pick<OrganizationDetail, "UniqueName" | "Url">>>(
  await discovery.listOrganizations({ select: names, orderby: "UniqueName" })
);

// A selected row isn't a full row, so it can't go to toEnvironment()
expectNotAssignable<OrganizationDetail>(picked[0]);
expectError(picked.map(toEnvironment));

// Only OrganizationDetail properties can be selected
expectError(await discovery.listOrganizations({ select: ["Endpoints"] }));

// Options whose select may or may not be set: rows that may be missing any property
declare const options: DiscoveryOptions;
expectType<Array<Partial<OrganizationDetail>>>(await discovery.listOrganizations(options));
expectAssignable<DiscoveryOptions>({ select: ["Id", "State"] });

// #482: State and OrganizationType suggest their known values and take any number, so typed JSON
// (and values Dataverse adds) still type-checks
declare const org: OrganizationDetail;
expectType<OrganizationState | (number & {})>(org.State);
declare const someNumber: number;
expectAssignable<OrganizationDetail["State"]>(someNumber);
expectNotAssignable<OrganizationState>(2);
expectType<0>(OrganizationState.Enabled);
expectType<OrganizationType | (number & {}) | undefined>(org.OrganizationType);
expectType<13>(OrganizationType.Developer);
expectAssignable<OrganizationDetail["OrganizationType"]>(99);
expectNotAssignable<OrganizationType>(99);
