import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetRequirementDemand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementDemandRequestParameters {
  RequirementIds: string;
}

/**
 * msdyn_GetRequirementDemand request message
 *
 * Web API Action: msdyn_GetRequirementDemand
 */
export class msdyn_GetRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementDemandResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementDemandRequestParameters>;

  constructor(parameters: msdyn_GetRequirementDemandRequestParameters) {
    super("msdyn_GetRequirementDemand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementDemand`;

    const body = requestBody({
      RequirementIds: this.Parameters.RequirementIds,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementDemandResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetRequirementDemandResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetRequirementDemand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetRequirementDemandResult {
  "@odata.context"?: string;
  RequirementsToDemandMap: string;
}

/**
 * msdyn_GetRequirementDemand response message
 *
 * `result` is the value the msdyn_GetRequirementDemand action returns (see {@link msdyn_GetRequirementDemandResult}).
 */
export class msdyn_GetRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementDemandResult) {
    super("msdyn_GetRequirementDemand");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetRequirementDemandResponse {
    return new msdyn_GetRequirementDemandResponse(data as msdyn_GetRequirementDemandResult);
  }
}
