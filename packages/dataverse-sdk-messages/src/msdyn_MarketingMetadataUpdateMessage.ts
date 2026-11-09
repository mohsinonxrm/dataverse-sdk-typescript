import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MarketingMetadataUpdate request message
 *
 * Web API Action: msdyn_MarketingMetadataUpdate
 */
export class msdyn_MarketingMetadataUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarketingMetadataUpdateResponse>
{
  constructor() {
    super("msdyn_MarketingMetadataUpdate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingMetadataUpdate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingMetadataUpdateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MarketingMetadataUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MarketingMetadataUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingMetadataUpdateResult {
  "@odata.context"?: string;
  resultCode: number;
}

/**
 * msdyn_MarketingMetadataUpdate response message
 *
 * `result` is the value the msdyn_MarketingMetadataUpdate action returns (see {@link msdyn_MarketingMetadataUpdateResult}).
 */
export class msdyn_MarketingMetadataUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdateResult) {
    super("msdyn_MarketingMetadataUpdate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdateResponse {
    return new msdyn_MarketingMetadataUpdateResponse(data as msdyn_MarketingMetadataUpdateResult);
  }
}
