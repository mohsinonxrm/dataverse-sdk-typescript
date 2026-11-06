import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRequirementModelsResponse as msdyn_GetRequirementModelsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRequirementModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRequirementModelsRequestParameters {
  Attributes: string;
}

/**
 * msdyn_GetRequirementModels request message
 *
 * Web API Action: msdyn_GetRequirementModels
 */
export class msdyn_GetRequirementModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRequirementModelsRequestParameters>;

  constructor(parameters: msdyn_GetRequirementModelsRequestParameters) {
    super("msdyn_GetRequirementModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

    const body = requestBody({
      Attributes: this.Parameters.Attributes,
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

  async parseResponse(response: Response): Promise<msdyn_GetRequirementModelsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetRequirementModelsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRequirementModels response message
 */
export class msdyn_GetRequirementModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRequirementModelsResponseData) {
    super("msdyn_GetRequirementModels");
  }

  static fromResponse(data: unknown): msdyn_GetRequirementModelsResponse {
    return new msdyn_GetRequirementModelsResponse(
      responseObject<msdyn_GetRequirementModelsResponseData>(data)
    );
  }
}
