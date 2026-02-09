import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    const data = await response.json();
    return msdyn_GetOrCreateBookableResourcesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Resources: this.resources,
    };
  }
}

/**
 * msdyn_GetOrCreateBookableResources response message
 */
export class msdyn_GetOrCreateBookableResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateBookableResourcesResponse) {
    super("msdyn_GetOrCreateBookableResources");
  }

  static fromResponse(data: unknown): msdyn_GetOrCreateBookableResourcesResponse {
    return new msdyn_GetOrCreateBookableResourcesResponse((data as any).value);
  }
}
