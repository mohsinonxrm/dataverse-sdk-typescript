import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse as msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse.fromResponse({});
    return msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo response message
 */
export class msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponseData) {
    super("msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfo");
  }

  static fromResponse(data: unknown): msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse {
    return new msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponse(
      responseObject<msdyn_SalesAgents_GetDataverseSearchPrerequisiteInfoResponseData>(data)
    );
  }
}
