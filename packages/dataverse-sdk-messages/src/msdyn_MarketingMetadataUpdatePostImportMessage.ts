import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_MarketingMetadataUpdatePostImportResponse as msdyn_MarketingMetadataUpdatePostImportResponseData } from "./types/index.js";

/**
 * msdyn_MarketingMetadataUpdatePostImport request message
 *
 * Web API Action: msdyn_MarketingMetadataUpdatePostImport
 */
export class msdyn_MarketingMetadataUpdatePostImportRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarketingMetadataUpdatePostImportResponse>
{
  constructor() {
    super("msdyn_MarketingMetadataUpdatePostImport");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarketingMetadataUpdatePostImport`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_MarketingMetadataUpdatePostImportResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_MarketingMetadataUpdatePostImportResponse.fromResponse({});
    return msdyn_MarketingMetadataUpdatePostImportResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_MarketingMetadataUpdatePostImport response message
 */
export class msdyn_MarketingMetadataUpdatePostImportResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdatePostImportResponseData) {
    super("msdyn_MarketingMetadataUpdatePostImport");
  }

  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdatePostImportResponse {
    return new msdyn_MarketingMetadataUpdatePostImportResponse(
      responseObject<msdyn_MarketingMetadataUpdatePostImportResponseData>(data)
    );
  }
}
