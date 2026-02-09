import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetChildResources request message
 *
 * Web API Action: msdyn_GetChildResources
 */
export class msdyn_GetChildResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChildResourcesResponse>
{
  constructor(
    public resourceIds: string,
    public ufxParameter: string
  ) {
    super("msdyn_GetChildResources");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChildResources`;

    const body: Record<string, unknown> = {
      ResourceIds: this.resourceIds,
      UfxParameter: this.ufxParameter,
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

  async parseResponse(response: Response): Promise<msdyn_GetChildResourcesResponse> {
    const data = await response.json();
    return msdyn_GetChildResourcesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ResourceIds: this.resourceIds,
      UfxParameter: this.ufxParameter,
    };
  }
}

/**
 * msdyn_GetChildResources response message
 */
export class msdyn_GetChildResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChildResourcesResponse) {
    super("msdyn_GetChildResources");
  }

  static fromResponse(data: unknown): msdyn_GetChildResourcesResponse {
    return new msdyn_GetChildResourcesResponse((data as any).value);
  }
}
