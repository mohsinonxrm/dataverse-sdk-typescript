import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { annotation } from "./types/index.js";

/**
 * adx_AzureBlobStorageUrl request message
 *
 * Web API Action: adx_AzureBlobStorageUrl
 */
export class adx_AzureBlobStorageUrlRequest
  extends OrganizationRequest
  implements Executable<adx_AzureBlobStorageUrlResponse>
{
  constructor(public annotation: annotation) {
    super("adx_AzureBlobStorageUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageUrl`;

    const body: Record<string, unknown> = {
      Annotation: this.annotation,
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

  async parseResponse(response: Response): Promise<adx_AzureBlobStorageUrlResponse> {
    const data = await response.json();
    return adx_AzureBlobStorageUrlResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Annotation: this.annotation,
    };
  }
}

/**
 * adx_AzureBlobStorageUrl response message
 */
export class adx_AzureBlobStorageUrlResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageUrlResponse) {
    super("adx_AzureBlobStorageUrl");
  }

  static fromResponse(data: unknown): adx_AzureBlobStorageUrlResponse {
    return new adx_AzureBlobStorageUrlResponse((data as any).value);
  }
}
