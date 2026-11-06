import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetBookableResourcesResponse as msdyn_GetBookableResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetBookableResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBookableResourcesRequestParameters {
  Resources: string;
}

/**
 * msdyn_GetBookableResources request message
 *
 * Web API Action: msdyn_GetBookableResources
 */
export class msdyn_GetBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookableResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBookableResourcesRequestParameters>;

  constructor(parameters: msdyn_GetBookableResourcesRequestParameters) {
    super("msdyn_GetBookableResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookableResources`;

    const body = requestBody({
      Resources: this.Parameters.Resources,
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

  async parseResponse(response: Response): Promise<msdyn_GetBookableResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetBookableResourcesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetBookableResources response message
 */
export class msdyn_GetBookableResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBookableResourcesResponseData) {
    super("msdyn_GetBookableResources");
  }

  static fromResponse(data: unknown): msdyn_GetBookableResourcesResponse {
    return new msdyn_GetBookableResourcesResponse(
      responseObject<msdyn_GetBookableResourcesResponseData>(data)
    );
  }
}
