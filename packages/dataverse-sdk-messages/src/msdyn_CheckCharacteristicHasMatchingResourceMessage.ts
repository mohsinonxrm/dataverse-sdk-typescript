import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckCharacteristicHasMatchingResourceResponse as msdyn_CheckCharacteristicHasMatchingResourceResponseData } from "./types/index.js";

/**
 * msdyn_CheckCharacteristicHasMatchingResource request message
 *
 * Web API Action: msdyn_CheckCharacteristicHasMatchingResource
 */
export class msdyn_CheckCharacteristicHasMatchingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckCharacteristicHasMatchingResourceResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckCharacteristicHasMatchingResource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCharacteristicHasMatchingResource`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
    const data = await response.json();
    return msdyn_CheckCharacteristicHasMatchingResourceResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckCharacteristicHasMatchingResource response message
 */
export class msdyn_CheckCharacteristicHasMatchingResourceResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckCharacteristicHasMatchingResourceResponseData) {
    super("msdyn_CheckCharacteristicHasMatchingResource");
  }

  static fromResponse(data: unknown): msdyn_CheckCharacteristicHasMatchingResourceResponse {
    return new msdyn_CheckCharacteristicHasMatchingResourceResponse(
      responseObject<msdyn_CheckCharacteristicHasMatchingResourceResponseData>(data)
    );
  }
}
