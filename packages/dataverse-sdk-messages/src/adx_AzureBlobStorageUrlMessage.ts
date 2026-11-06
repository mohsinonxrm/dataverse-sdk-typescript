import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  adx_AzureBlobStorageUrlResponse as adx_AzureBlobStorageUrlResponseData,
  annotation,
} from "./types/index.js";

/**
 * Parameters of the adx_AzureBlobStorageUrl message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_AzureBlobStorageUrlRequestParameters {
  Annotation?: EntityReference | EntityPayload<annotation>;
}

/**
 * adx_AzureBlobStorageUrl request message
 *
 * Web API Action: adx_AzureBlobStorageUrl
 */
export class adx_AzureBlobStorageUrlRequest
  extends OrganizationRequest
  implements Executable<adx_AzureBlobStorageUrlResponse>
{
  declare readonly Parameters: Readonly<adx_AzureBlobStorageUrlRequestParameters>;

  constructor(parameters: adx_AzureBlobStorageUrlRequestParameters = {}) {
    super("adx_AzureBlobStorageUrl", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_AzureBlobStorageUrl`;

    const body = requestBody({
      Annotation: this.Parameters.Annotation,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return adx_AzureBlobStorageUrlResponse.fromResponse(text ? JSON.parse(text) : {});
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
