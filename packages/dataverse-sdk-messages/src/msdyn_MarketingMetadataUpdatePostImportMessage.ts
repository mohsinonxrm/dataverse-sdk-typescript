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
    // The body is the complex value, with its @odata.context
    return msdyn_MarketingMetadataUpdatePostImportResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_MarketingMetadataUpdatePostImport action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_MarketingMetadataUpdatePostImportResult {
  "@odata.context"?: string;
  resultCode: number;
}

/**
 * msdyn_MarketingMetadataUpdatePostImport response message
 *
 * `result` is the value the msdyn_MarketingMetadataUpdatePostImport action returns (see {@link msdyn_MarketingMetadataUpdatePostImportResult}).
 */
export class msdyn_MarketingMetadataUpdatePostImportResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarketingMetadataUpdatePostImportResult) {
    super("msdyn_MarketingMetadataUpdatePostImport");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_MarketingMetadataUpdatePostImportResponse {
    return new msdyn_MarketingMetadataUpdatePostImportResponse(
      data as msdyn_MarketingMetadataUpdatePostImportResult
    );
  }
}
