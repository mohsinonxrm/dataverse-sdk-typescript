/**
 * CheckPrivilege message (#435). Hand-written: neither the Web API nor the .NET SDK has a
 * CheckPrivilege message. Dataverse checks one privilege of a user with the
 * RetrieveUserPrivilegeByPrivilegeName function (the .NET
 * `RetrieveUserPrivilegeByPrivilegeNameRequest`), which lists the user's grants of it, from their
 * roles and their teams' roles: the user has the privilege when the list isn't empty. This message
 * runs that function and answers the question.
 */
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";

/** A privilege depth by name: `"Basic"`, `"Local"`, `"Deep"`, `"Global"` or `"RecordFilter"`. */
export type PrivilegeDepthName = "Basic" | "Local" | "Deep" | "Global" | "RecordFilter";

/**
 * The `PrivilegeDepth` enum's members. Kept here rather than imported from the generated `types/`:
 * the generator's tests compile this folder next to packages generated from small CSDL fixtures,
 * which don't declare the enum.
 */
const PRIVILEGE_DEPTHS: Readonly<Record<PrivilegeDepthName, number>> = {
  Basic: 0,
  Local: 1,
  Deep: 2,
  Global: 3,
  RecordFilter: 4,
};

/** A privilege depth: a `PrivilegeDepth` member (`PrivilegeDepth.Global`) or its name. */
export type PrivilegeDepthValue = number | PrivilegeDepthName;

/** Parameters of the CheckPrivilege message. */
export interface CheckPrivilegeRequestParameters {
  /** The user (`systemuserid`), e.g. `UserId` of `WhoAmI` for the caller. */
  UserId: string;
  /** The privilege, by name: `"prvCreateAccount"`, `"prvReadAuditSummary"`, … */
  PrivilegeName: string;
  /**
   * The least depth the user needs: `"Local"` is met by a Local, Deep or Global grant. Left out,
   * any grant counts. `"RecordFilter"` is met only by a record-filter grant.
   */
  Depth?: PrivilegeDepthValue;
}

/**
 * CheckPrivilege request message: whether a user has a privilege, through their security roles or
 * their teams' (`GET /systemusers(<id>)/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1)`).
 *
 * There is no CheckPrivilege message in Dataverse: this is the check Microsoft documents
 * ("Verifying access in code"), as a message. For the access to one record, use
 * `RetrievePrincipalAccessRequest`.
 *
 * @example
 * ```typescript
 * const { UserId } = (await client.execute(new WhoAmIRequest())).result;
 * const { HasPrivilege } = await client.execute(
 *   new CheckPrivilegeRequest({ UserId, PrivilegeName: "prvCreateAccount" })
 * );
 * ```
 */
export class CheckPrivilegeRequest
  extends OrganizationRequest
  implements Executable<CheckPrivilegeResponse>
{
  declare readonly Parameters: Readonly<CheckPrivilegeRequestParameters>;

  constructor(parameters: CheckPrivilegeRequestParameters) {
    super("CheckPrivilege", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { UserId, PrivilegeName } = this.Parameters;
    const params = new URLSearchParams();
    params.append("@p1", odataLiteral.parameter(PrivilegeName, "Edm.String"));
    return {
      method: "GET",
      url:
        `${baseUrl}/systemusers(${odataLiteral.guid(UserId)})` +
        `/Microsoft.Dynamics.CRM.RetrieveUserPrivilegeByPrivilegeName(PrivilegeName=@p1)` +
        `?${params.toString()}`,
      headers: { Accept: "application/json" },
    };
  }

  async parseResponse(response: Response): Promise<CheckPrivilegeResponse> {
    return new CheckPrivilegeResponse(
      (await response.json()) as CheckPrivilegeResult,
      this.Parameters.Depth
    );
  }
}

/** One grant of the privilege, as the Web API returns it (`Depth` is a member name). */
export interface CheckPrivilegeGrant {
  BusinessUnitId?: string;
  /** The grant's depth: `"Basic"`, `"Local"`, `"Deep"`, `"Global"` or `"RecordFilter"`. */
  Depth?: PrivilegeDepthValue;
  PrivilegeId?: string;
  PrivilegeName?: string;
  RecordFilterId?: string;
  RecordFilterUniqueName?: string;
}

/** The RetrieveUserPrivilegeByPrivilegeName function's value: the user's grants of the privilege. */
export interface CheckPrivilegeResult {
  "@odata.context"?: string;
  RolePrivileges: CheckPrivilegeGrant[];
}

/** The depths from least to most, which a required depth is compared on. */
const DEPTH_ORDER: readonly PrivilegeDepthName[] = ["Basic", "Local", "Deep", "Global"];

/**
 * CheckPrivilege response message: `HasPrivilege`, the deepest `Depth` granted, and the grants
 * (`RolePrivileges`, also in `result`).
 */
export class CheckPrivilegeResponse extends OrganizationResponse {
  readonly #required: PrivilegeDepthName | undefined;

  /**
   * @param result - The RetrieveUserPrivilegeByPrivilegeName function's value
   * @param depth - The least depth the user needs (the request's `Depth`)
   */
  constructor(
    public result: CheckPrivilegeResult,
    depth?: PrivilegeDepthValue
  ) {
    super("CheckPrivilege");
    this.#required = depthName(depth);
  }

  /** The user's grants of the privilege, from their roles and their teams' roles. */
  get RolePrivileges(): CheckPrivilegeGrant[] {
    return this.result.RolePrivileges;
  }

  /** Whether the user has the privilege (at the request's `Depth` or deeper, when given). */
  get HasPrivilege(): boolean {
    const required = this.#required;
    const depths = this.RolePrivileges.map((grant) => depthName(grant.Depth));
    if (required === undefined) return depths.length > 0;
    if (required === "RecordFilter") return depths.includes("RecordFilter");
    const least = DEPTH_ORDER.indexOf(required);
    return depths.some((depth) => depth !== undefined && DEPTH_ORDER.indexOf(depth) >= least);
  }

  /**
   * The deepest depth the user has the privilege at (`"Global"` beats `"Deep"`, …), or
   * `"RecordFilter"` when that is the only kind of grant; `undefined` without the privilege.
   */
  get Depth(): PrivilegeDepthName | undefined {
    let deepest: PrivilegeDepthName | undefined;
    for (const grant of this.RolePrivileges) {
      const depth = depthName(grant.Depth);
      if (depth === undefined) continue;
      if (deepest === undefined || DEPTH_ORDER.indexOf(depth) > DEPTH_ORDER.indexOf(deepest)) {
        deepest = depth;
      }
    }
    return deepest;
  }
}

/** The name of a depth given as a number or a name; `undefined` for anything else. */
function depthName(depth: unknown): PrivilegeDepthName | undefined {
  if (typeof depth === "string") {
    return Object.hasOwn(PRIVILEGE_DEPTHS, depth) ? (depth as PrivilegeDepthName) : undefined;
  }
  if (typeof depth === "number") {
    return (Object.keys(PRIVILEGE_DEPTHS) as PrivilegeDepthName[]).find(
      (name) => PRIVILEGE_DEPTHS[name] === depth
    );
  }
  return undefined;
}
