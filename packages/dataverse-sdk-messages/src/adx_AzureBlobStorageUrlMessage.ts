import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { annotation } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return adx_AzureBlobStorageUrlResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the adx_AzureBlobStorageUrl action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface adx_AzureBlobStorageUrlResult {
  "@odata.context"?: string;
  Url: string;
}

/**
 * adx_AzureBlobStorageUrl response message
 *
 * `result` is the value the adx_AzureBlobStorageUrl action returns (see {@link adx_AzureBlobStorageUrlResult}).
 */
export class adx_AzureBlobStorageUrlResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageUrlResult) {
    super("adx_AzureBlobStorageUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): adx_AzureBlobStorageUrlResponse {
    return new adx_AzureBlobStorageUrlResponse(data as adx_AzureBlobStorageUrlResult);
  }
}
