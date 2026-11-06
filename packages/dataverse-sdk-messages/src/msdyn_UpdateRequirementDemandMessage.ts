import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateRequirementDemand message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRequirementDemandRequestParameters {
  RequirementDemandContext: string;
}

/**
 * msdyn_UpdateRequirementDemand request message
 *
 * Web API Action: msdyn_UpdateRequirementDemand
 */
export class msdyn_UpdateRequirementDemandRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRequirementDemandResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateRequirementDemandRequestParameters>;

  constructor(parameters: msdyn_UpdateRequirementDemandRequestParameters) {
    super("msdyn_UpdateRequirementDemand", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRequirementDemand`;

    const body = requestBody({
      RequirementDemandContext: this.Parameters.RequirementDemandContext,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRequirementDemandResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateRequirementDemandResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateRequirementDemand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateRequirementDemandResult {
  "@odata.context"?: string;
  PersistedRequirementDemandContext: string;
}

/**
 * msdyn_UpdateRequirementDemand response message
 *
 * `result` is the value the msdyn_UpdateRequirementDemand action returns (see {@link msdyn_UpdateRequirementDemandResult}).
 */
export class msdyn_UpdateRequirementDemandResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateRequirementDemandResult) {
    super("msdyn_UpdateRequirementDemand");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateRequirementDemandResponse {
    return new msdyn_UpdateRequirementDemandResponse(data as msdyn_UpdateRequirementDemandResult);
  }
}
