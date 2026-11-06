import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MarketingListMetadataUpdate request message
 *
 * Web API Action: msdyn_MarketingListMetadataUpdate
 */
export class msdyn_MarketingListMetadataUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarketingListMetadataUpdateResponse>
{
  constructor() {
    super("msdyn_MarketingListMetadataUpdate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingListMetadataUpdate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarketingListMetadataUpdateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_MarketingListMetadataUpdateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MarketingListMetadataUpdate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingListMetadataUpdateResult {
  "@odata.context"?: string;
  resultCode: number;
}

/**
 * msdyn_MarketingListMetadataUpdate response message
 *
 * `result` is the value the msdyn_MarketingListMetadataUpdate action returns (see {@link msdyn_MarketingListMetadataUpdateResult}).
 */
export class msdyn_MarketingListMetadataUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingListMetadataUpdateResult) {
    super("msdyn_MarketingListMetadataUpdate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MarketingListMetadataUpdateResponse {
    return new msdyn_MarketingListMetadataUpdateResponse(
      data as msdyn_MarketingListMetadataUpdateResult
    );
  }
}
