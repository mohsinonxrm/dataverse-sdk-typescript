import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetChildResourcesResponse as msdyn_GetChildResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetChildResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChildResourcesRequestParameters {
  ResourceIds: string;
  UfxParameter: string;
}

/**
 * msdyn_GetChildResources request message
 *
 * Web API Action: msdyn_GetChildResources
 */
export class msdyn_GetChildResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChildResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetChildResourcesRequestParameters>;

  constructor(parameters: msdyn_GetChildResourcesRequestParameters) {
    super("msdyn_GetChildResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildResources`;

    const body = requestBody({
      ResourceIds: this.Parameters.ResourceIds,
      UfxParameter: this.Parameters.UfxParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildResourcesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetChildResourcesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetChildResources response message
 */
export class msdyn_GetChildResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildResourcesResponseData) {
    super("msdyn_GetChildResources");
  }

  static fromResponse(data: unknown): msdyn_GetChildResourcesResponse {
    return new msdyn_GetChildResourcesResponse(
      responseObject<msdyn_GetChildResourcesResponseData>(data)
    );
  }
}
