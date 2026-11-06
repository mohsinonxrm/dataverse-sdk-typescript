import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetOrCreateBookableResourcesResponse as msdyn_GetOrCreateBookableResourcesResponseData } from "./types/index.js";

/**
 * msdyn_GetOrCreateBookableResources request message
 *
 * Web API Action: msdyn_GetOrCreateBookableResources
 */
export class msdyn_GetOrCreateBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateBookableResourcesResponse>
{
  constructor(public resources: string) {
    super("msdyn_GetOrCreateBookableResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateBookableResources`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    const data = await response.json();
    return msdyn_GetOrCreateBookableResourcesResponse.fromResponse(data);
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
