import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetResourcesResponse as msdyn_GetResourcesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetResourcesRequestParameters {
  Page: number;
  PageSize: number;
  QueryString: string;
}

/**
 * msdyn_GetResources request message
 *
 * Web API Action: msdyn_GetResources
 */
export class msdyn_GetResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetResourcesRequestParameters>;

  constructor(parameters: msdyn_GetResourcesRequestParameters) {
    super("msdyn_GetResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResources`;

    const body = requestBody({
      Page: this.Parameters.Page,
      PageSize: this.Parameters.PageSize,
      QueryString: this.Parameters.QueryString,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetResourcesResponse.fromResponse({});
    return msdyn_GetResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetResources response message
 */
export class msdyn_GetResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourcesResponseData) {
    super("msdyn_GetResources");
  }

  static fromResponse(data: unknown): msdyn_GetResourcesResponse {
    return new msdyn_GetResourcesResponse(responseObject<msdyn_GetResourcesResponseData>(data));
  }
}
