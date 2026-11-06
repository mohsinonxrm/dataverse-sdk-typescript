import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo request message
 *
 * Web API Action: msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo
 */
export class msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequestParameters>;

  constructor(parameters: msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoRequestParameters) {
    super("msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo response message
 *
 * `result` is the value the msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo action returns (see {@link msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResult}).
 */
export class msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResult) {
    super("msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse {
    return new msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse(
      data as msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResult
    );
  }
}
