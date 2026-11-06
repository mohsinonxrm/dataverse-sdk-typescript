import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetOrCreateBookableResourcesResponse as msdyn_GetOrCreateBookableResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetOrCreateBookableResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateBookableResourcesRequestParameters {
  Resources: string;
}

/**
 * msdyn_GetOrCreateBookableResources request message
 *
 * Web API Action: msdyn_GetOrCreateBookableResources
 */
export class msdyn_GetOrCreateBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateBookableResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOrCreateBookableResourcesRequestParameters>;

  constructor(parameters: msdyn_GetOrCreateBookableResourcesRequestParameters) {
    super("msdyn_GetOrCreateBookableResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateBookableResources`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetOrCreateBookableResourcesResponse.fromResponse({});
    return msdyn_GetOrCreateBookableResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOrCreateBookableResources response message
 */
export class msdyn_GetOrCreateBookableResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateBookableResourcesResponseData) {
    super("msdyn_GetOrCreateBookableResources");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateBookableResourcesResponse {
    return new msdyn_GetOrCreateBookableResourcesResponse(
      responseObject<msdyn_GetOrCreateBookableResourcesResponseData>(data)
    );
  }
}
