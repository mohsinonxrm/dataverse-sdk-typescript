import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { adx_AzureBlobStorageEnabledResponse as adx_AzureBlobStorageEnabledResponseData } from "./types/index.js";

/**
 * adx_AzureBlobStorageEnabled request message
 *
 * Web API Action: adx_AzureBlobStorageEnabled
 */
export class adx_AzureBlobStorageEnabledRequest
  extends OrganizationRequest
  implements Executable<adx_AzureBlobStorageEnabledResponse>
{
  constructor() {
    super("adx_AzureBlobStorageEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<adx_AzureBlobStorageEnabledResponse> {
    const data = await response.json();
    return adx_AzureBlobStorageEnabledResponse.fromResponse(data);
  }
}

/**
 * adx_AzureBlobStorageEnabled response message
 */
export class adx_AzureBlobStorageEnabledResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageEnabledResponseData) {
    super("adx_AzureBlobStorageEnabled");
  }

  static fromResponse(data: unknown): adx_AzureBlobStorageEnabledResponse {
    return new adx_AzureBlobStorageEnabledResponse(
      responseObject<adx_AzureBlobStorageEnabledResponseData>(data)
    );
  }
}
