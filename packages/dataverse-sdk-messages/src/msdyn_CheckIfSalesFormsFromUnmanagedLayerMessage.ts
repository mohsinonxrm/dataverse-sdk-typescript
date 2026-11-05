import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer request message
 *
 * Web API Action: msdyn_CheckIfSalesFormsFromUnmanagedLayer
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse>
{
  constructor() {
    super("msdyn_CheckIfSalesFormsFromUnmanagedLayer");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSalesFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse> {
    const data = await response.json();
    return msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer response message
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse) {
    super("msdyn_CheckIfSalesFormsFromUnmanagedLayer");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse((data as any).value);
  }
}
