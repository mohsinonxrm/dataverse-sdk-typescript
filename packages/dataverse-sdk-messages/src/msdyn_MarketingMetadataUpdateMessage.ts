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
    const data = await response.json();
    return msdyn_MarketingMetadataUpdateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_MarketingMetadataUpdate response message
 */
export class msdyn_MarketingMetadataUpdateResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdateResponse) {
    super("msdyn_MarketingMetadataUpdate");
  }

  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdateResponse {
    return new msdyn_MarketingMetadataUpdateResponse((data as any).value);
  }
}
