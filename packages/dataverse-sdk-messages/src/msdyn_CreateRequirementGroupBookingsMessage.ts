import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateRequirementGroupBookings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementGroupBookingsRequestParameters {
  Version?: string;
  Start: string;
  Duration: number;
  ResourceAssignments: Record<string, unknown>[];
  RequirementGroup: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateRequirementGroupBookings request message
 *
 * Web API Action: msdyn_CreateRequirementGroupBookings
 */
export class msdyn_CreateRequirementGroupBookingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementGroupBookingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateRequirementGroupBookingsRequestParameters>;

  constructor(parameters: msdyn_CreateRequirementGroupBookingsRequestParameters) {
    super("msdyn_CreateRequirementGroupBookings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementGroupBookings`;

    const body = requestBody({
      Version: this.Parameters.Version,
      Start: this.Parameters.Start,
      Duration: this.Parameters.Duration,
      ResourceAssignments: this.Parameters.ResourceAssignments,
      RequirementGroup: this.Parameters.RequirementGroup,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementGroupBookingsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateRequirementGroupBookingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateRequirementGroupBookings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateRequirementGroupBookingsResult {
  "@odata.context"?: string;
  HandlerExecuted: boolean;
}

/**
 * msdyn_CreateRequirementGroupBookings response message
 *
 * `result` is the value the msdyn_CreateRequirementGroupBookings action returns (see {@link msdyn_CreateRequirementGroupBookingsResult}).
 */
export class msdyn_CreateRequirementGroupBookingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRequirementGroupBookingsResult) {
    super("msdyn_CreateRequirementGroupBookings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateRequirementGroupBookingsResponse {
    return new msdyn_CreateRequirementGroupBookingsResponse(
      data as msdyn_CreateRequirementGroupBookingsResult
    );
  }
}
