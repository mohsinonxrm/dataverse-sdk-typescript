import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfCSFormsFromUnmanagedLayerResponse as msdyn_CheckIfCSFormsFromUnmanagedLayerResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckIfCSFormsFromUnmanagedLayerResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer response message
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfCSFormsFromUnmanagedLayerResponseData) {
    super("msdyn_CheckIfCSFormsFromUnmanagedLayer");
  }

  static fromResponse(data: unknown): msdyn_CheckIfCSFormsFromUnmanagedLayerResponse {
    return new msdyn_CheckIfCSFormsFromUnmanagedLayerResponse(
      responseObject<msdyn_CheckIfCSFormsFromUnmanagedLayerResponseData>(data)
    );
  }
}
