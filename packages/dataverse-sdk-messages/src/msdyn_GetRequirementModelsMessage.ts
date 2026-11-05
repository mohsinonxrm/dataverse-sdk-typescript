import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRequirementModelsResponse as msdyn_GetRequirementModelsResponseData } from "./types/index.js";

/**
 * msdyn_GetRequirementModels request message
 *
 * Web API Action: msdyn_GetRequirementModels
 */
export class msdyn_GetRequirementModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRequirementModelsResponse>
{
  constructor(public attributes: string) {
    super("msdyn_GetRequirementModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRequirementModels`;

    const body: Record<string, unknown> = {
      Attributes: this.attributes,
    };

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
    const data = await response.json();
    return msdyn_GetRequirementModelsResponse.fromResponse(data);
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
