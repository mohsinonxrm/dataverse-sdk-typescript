/**
 * RetrievePrincipalAccess message (#435). Hand-written: the Web API declares the
 * RetrievePrincipalAccess function once per table it is bound to (systemuser, team and
 * organization), so the generated messages are `RetrievePrincipalAccess_systemuserRequest` and so
 * on. This one is the .NET `RetrievePrincipalAccessRequest`: the principal is a reference, and its
 * table picks the binding.
 */
import {
  DataverseInvalidRequestError,
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import { recordPath } from "./internal.js";

/**
 * The members of the `AccessRights` flags enum. Kept here rather than imported from the generated
 * `types/`: the generator's tests compile this folder next to packages generated from small CSDL
 * fixtures, which don't declare the enum.
 */
const ACCESS_RIGHTS: Readonly<Record<string, number>> = {
  None: 0,
  ReadAccess: 1,
  WriteAccess: 2,
  AppendAccess: 4,
  AppendToAccess: 16,
  CreateAccess: 32,
  DeleteAccess: 65536,
  ShareAccess: 262144,
  AssignAccess: 524288,
};

/** The tables RetrievePrincipalAccess is bound to. */
const PRINCIPAL_TABLES: readonly string[] = ["systemuser", "team", "organization"];

/** Parameters of the RetrievePrincipalAccess message. */
export interface RetrievePrincipalAccessRequestParameters {
  /**
   * The user, team or organization whose access to read, made with `createEntityReference`
   * (`createEntityReference("systemuser", userId)`).
   */
  Principal: EntityReference;
  /** The record, made with `createEntityReference`. */
  Target: EntityReference;
}

/**
 * RetrievePrincipalAccess request message: the access rights a user, team or organization has on
 * a record (`GET /<principal's entity set>(<id>)/Microsoft.Dynamics.CRM.RetrievePrincipalAccess(Target=@p1)`,
 * with `@p1={"@odata.id":"<entity set>(<id>)"}`).
 *
 * @example
 * ```typescript
 * const { AccessRights: rights } = await client.execute(
 *   new RetrievePrincipalAccessRequest({
 *     Principal: createEntityReference("systemuser", userId),
 *     Target: createEntityReference("account", accountId),
 *   })
 * );
 * const canWrite = (rights & AccessRights.WriteAccess) !== 0;
 * ```
 */
export class RetrievePrincipalAccessRequest
  extends OrganizationRequest
  implements Executable<RetrievePrincipalAccessResponse>
{
  declare readonly Parameters: Readonly<RetrievePrincipalAccessRequestParameters>;

  constructor(parameters: RetrievePrincipalAccessRequestParameters) {
    super("RetrievePrincipalAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Principal, Target } = this.Parameters;
    if (!PRINCIPAL_TABLES.includes(Principal.logicalName)) {
      throw DataverseInvalidRequestError.invalidParameter(
        "Principal",
        `RetrievePrincipalAccess is bound to systemuser, team and organization, not ${Principal.logicalName}`
      );
    }
    const params = new URLSearchParams();
    params.append("@p1", odataLiteral.parameter(Target, "mscrm.crmbaseentity", "EntityType"));
    return {
      method: "GET",
      url:
        `${baseUrl}/${recordPath(Principal)}/Microsoft.Dynamics.CRM.RetrievePrincipalAccess` +
        `(Target=@p1)?${params.toString()}`,
      headers: { Accept: "application/json" },
    };
  }

  async parseResponse(response: Response): Promise<RetrievePrincipalAccessResponse> {
    return new RetrievePrincipalAccessResponse(
      (await response.json()) as RetrievePrincipalAccessResult
    );
  }
}

/**
 * The RetrievePrincipalAccess function's value, as the Web API returns it: the access rights are
 * member names (`"ReadAccess, WriteAccess"`).
 */
export interface RetrievePrincipalAccessResult {
  "@odata.context"?: string;
  /** The rights as the Web API sends them: member names joined with `, ` (or a number). */
  AccessRights: string | number;
}

/**
 * RetrievePrincipalAccess response message: `AccessRights` is the rights as a number, the
 * `AccessRights` flags combined (as the .NET `RetrievePrincipalAccessResponse.AccessRights`),
 * and `result` the Web API's value.
 */
export class RetrievePrincipalAccessResponse extends OrganizationResponse {
  constructor(public result: RetrievePrincipalAccessResult) {
    super("RetrievePrincipalAccess");
  }

  /**
   * The access rights: the `AccessRights` flags combined, so
   * `(response.AccessRights & AccessRights.WriteAccess) !== 0` checks one. Names the SDK doesn't
   * know are left out (they are in `result.AccessRights`).
   */
  get AccessRights(): number {
    return accessRightsValue(this.result.AccessRights);
  }
}

/** The number of an `AccessRights` value: a number, or member names joined with `,`. */
function accessRightsValue(value: string | number | undefined): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;
  if (/^\s*\d+\s*$/.test(value)) return Number(value);
  let rights = 0;
  for (const name of value.split(",")) {
    const member = name.trim();
    if (Object.hasOwn(ACCESS_RIGHTS, member)) rights |= ACCESS_RIGHTS[member];
  }
  return rights;
}
