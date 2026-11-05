import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetBookableResourcesResponse as msdyn_GetBookableResourcesResponseData } from "./types/index.js";

/**
 * msdyn_GetBookableResources request message
 *
 * Web API Action: msdyn_GetBookableResources
 */
export class msdyn_GetBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookableResourcesResponse>
{
  constructor(public resources: string) {
    super("msdyn_GetBookableResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookableResources`;

    const body: Record<string, unknown> = {
      Resources: this.resources,
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

  async parseResponse(response: Response): Promise<msdyn_GetBookableResourcesResponse> {
    const data = await response.json();
    return msdyn_GetBookableResourcesResponse.fromResponse(data);
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
