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
    // The body is the complex value, with its @odata.context
    return adx_AzureBlobStorageEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the adx_AzureBlobStorageEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface adx_AzureBlobStorageEnabledResult {
  "@odata.context"?: string;
  Enabled: boolean;
}

/**
 * adx_AzureBlobStorageEnabled response message
 *
 * `result` is the value the adx_AzureBlobStorageEnabled action returns (see {@link adx_AzureBlobStorageEnabledResult}).
 */
export class adx_AzureBlobStorageEnabledResponse extends OrganizationResponse {
  constructor(public result: adx_AzureBlobStorageEnabledResult) {
    super("adx_AzureBlobStorageEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): adx_AzureBlobStorageEnabledResponse {
    return new adx_AzureBlobStorageEnabledResponse(data as adx_AzureBlobStorageEnabledResult);
  }
}
