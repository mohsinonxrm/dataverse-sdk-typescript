import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer request message
 *
 * Web API Action: msdyn_CheckIfCSFormsFromUnmanagedLayer
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse>
{
  constructor() {
    super("msdyn_CheckIfCSFormsFromUnmanagedLayer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfCSFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse> {
    const data = await response.json();
    return msdyn_CheckIfCSFormsFromUnmanagedLayerResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer response message
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfCSFormsFromUnmanagedLayerResponse) {
    super("msdyn_CheckIfCSFormsFromUnmanagedLayer");
  }

  static fromResponse(data: unknown): msdyn_CheckIfCSFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfCSFormsFromUnmanagedLayerResponse((data as any).value);
  }
}
