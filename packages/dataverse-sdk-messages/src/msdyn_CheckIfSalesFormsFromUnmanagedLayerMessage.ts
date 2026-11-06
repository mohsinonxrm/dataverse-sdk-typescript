import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse as msdyn_CheckIfSalesFormsFromUnmanagedLayerResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse.fromResponse({});
    return msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer response message
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSalesFormsFromUnmanagedLayerResponseData) {
    super("msdyn_CheckIfSalesFormsFromUnmanagedLayer");
  }

  static fromResponse(data: unknown): msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse(
      responseObject<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponseData>(data)
    );
  }
}
