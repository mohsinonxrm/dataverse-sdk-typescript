import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    const data = await response.json();
    return msdyn_MarketingMetadataUpdatePostImportResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_MarketingMetadataUpdatePostImport response message
 */
export class msdyn_MarketingMetadataUpdatePostImportResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdatePostImportResponse) {
    super("msdyn_MarketingMetadataUpdatePostImport");
  }

  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdatePostImportResponse {
    return new msdyn_MarketingMetadataUpdatePostImportResponse((data as any).value);
  }
}
