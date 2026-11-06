import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateRequirementModelResponse as msdyn_CreateRequirementModelResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateRequirementModel message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateRequirementModelRequestParameters {
  Attributes: string;
  From?: string;
  To?: string;
}

/**
 * msdyn_CreateRequirementModel request message
 *
 * Web API Action: msdyn_CreateRequirementModel
 */
export class msdyn_CreateRequirementModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateRequirementModelResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateRequirementModelRequestParameters>;

  constructor(parameters: msdyn_CreateRequirementModelRequestParameters) {
    super("msdyn_CreateRequirementModel", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateRequirementModel`;

    const body = requestBody({
      Attributes: this.Parameters.Attributes,
      From: this.Parameters.From,
      To: this.Parameters.To,
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

  async parseResponse(response: Response): Promise<msdyn_CreateRequirementModelResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateRequirementModelResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CreateRequirementModel response message
 */
export class msdyn_CreateRequirementModelResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateRequirementModelResponseData) {
    super("msdyn_CreateRequirementModel");
  }

  static fromResponse(data: unknown): msdyn_CreateRequirementModelResponse {
    return new msdyn_CreateRequirementModelResponse(
      responseObject<msdyn_CreateRequirementModelResponseData>(data)
    );
  }
}
