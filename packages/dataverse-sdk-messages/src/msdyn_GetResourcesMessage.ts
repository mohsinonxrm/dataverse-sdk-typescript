import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetResourcesResponse as msdyn_GetResourcesResponseData } from "./types/index.js";

/**
 * msdyn_GetResources request message
 *
 * Web API Action: msdyn_GetResources
 */
export class msdyn_GetResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourcesResponse>
{
  constructor(
    public page: number,
    public pageSize: number,
    public queryString: string
  ) {
    super("msdyn_GetResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResources`;

    const body: Record<string, unknown> = {
      Page: this.page,
      PageSize: this.pageSize,
      QueryString: this.queryString,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourcesResponse> {
    const data = await response.json();
    return msdyn_GetResourcesResponse.fromResponse(data);
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
