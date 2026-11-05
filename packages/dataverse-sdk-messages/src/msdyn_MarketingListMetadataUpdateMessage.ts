import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MarketingListMetadataUpdateResponse as msdyn_MarketingListMetadataUpdateResponseData } from "./types/index.js";

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
    const data = await response.json();
    return msdyn_MarketingListMetadataUpdateResponse.fromResponse(data);
  }
}

/**
 * msdyn_MarketingListMetadataUpdate response message
 */
export class msdyn_MarketingListMetadataUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingListMetadataUpdateResponseData) {
    super("msdyn_MarketingListMetadataUpdate");
  }

  static fromResponse(data: unknown): msdyn_MarketingListMetadataUpdateResponse {
    return new msdyn_MarketingListMetadataUpdateResponse(
      responseObject<msdyn_MarketingListMetadataUpdateResponseData>(data)
    );
  }
}
