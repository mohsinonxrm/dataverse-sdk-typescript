import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MarketingMetadataUpdateResponse as msdyn_MarketingMetadataUpdateResponseData } from "./types/index.js";

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
    const data = await response.json();
    return msdyn_MarketingMetadataUpdateResponse.fromResponse(data);
  }
}

/**
 * msdyn_MarketingMetadataUpdate response message
 */
export class msdyn_MarketingMetadataUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdateResponseData) {
    super("msdyn_MarketingMetadataUpdate");
  }

  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdateResponse {
    return new msdyn_MarketingMetadataUpdateResponse(
      responseObject<msdyn_MarketingMetadataUpdateResponseData>(data)
    );
  }
}
