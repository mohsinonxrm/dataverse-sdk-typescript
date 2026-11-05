import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * adx_AzureBlobStorageEnabled response message
 */
export class adx_AzureBlobStorageEnabledResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageEnabledResponse) {
    super("adx_AzureBlobStorageEnabled");
  }

  static fromResponse(data: unknown): adx_AzureBlobStorageEnabledResponse {
    return new adx_AzureBlobStorageEnabledResponse((data as any).value);
  }
}
