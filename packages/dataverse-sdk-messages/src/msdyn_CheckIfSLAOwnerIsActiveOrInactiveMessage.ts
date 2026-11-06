import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse as msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckIfSLAOwnerIsActiveOrInactive message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive request message
 *
 * Web API Action: msdyn_CheckIfSLAOwnerIsActiveOrInactive
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters>;

  constructor(parameters: msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters = {}) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAOwnerIsActiveOrInactive`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
      ExcludeSolutionIds: this.Parameters.ExcludeSolutionIds,
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
  ): Promise<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive response message
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponseData) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse {
    return new msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse(
      responseObject<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponseData>(data)
    );
  }
}
