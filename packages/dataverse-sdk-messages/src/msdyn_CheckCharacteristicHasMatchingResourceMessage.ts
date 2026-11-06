import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckCharacteristicHasMatchingResourceResponse as msdyn_CheckCharacteristicHasMatchingResourceResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckCharacteristicHasMatchingResource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckCharacteristicHasMatchingResourceRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckCharacteristicHasMatchingResource request message
 *
 * Web API Action: msdyn_CheckCharacteristicHasMatchingResource
 */
export class msdyn_CheckCharacteristicHasMatchingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckCharacteristicHasMatchingResourceResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckCharacteristicHasMatchingResourceRequestParameters>;

  constructor(parameters: msdyn_CheckCharacteristicHasMatchingResourceRequestParameters) {
    super("msdyn_CheckCharacteristicHasMatchingResource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckCharacteristicHasMatchingResource`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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
  ): Promise<msdyn_CheckCharacteristicHasMatchingResourceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckCharacteristicHasMatchingResourceResponse.fromResponse({});
    return msdyn_CheckCharacteristicHasMatchingResourceResponse.fromResponse(await response.json());
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
