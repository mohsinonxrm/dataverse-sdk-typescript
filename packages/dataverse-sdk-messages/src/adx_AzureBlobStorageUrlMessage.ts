import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  adx_AzureBlobStorageUrlResponse as adx_AzureBlobStorageUrlResponseData,
  annotation,
} from "./types/index.js";

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
}

/**
 * adx_AzureBlobStorageUrl response message
 */
export class adx_AzureBlobStorageUrlResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageUrlResponseData) {
    super("adx_AzureBlobStorageUrl");
  }

  static fromResponse(data: unknown): adx_AzureBlobStorageUrlResponse {
    return new adx_AzureBlobStorageUrlResponse(
      responseObject<adx_AzureBlobStorageUrlResponseData>(data)
    );
  }
}
