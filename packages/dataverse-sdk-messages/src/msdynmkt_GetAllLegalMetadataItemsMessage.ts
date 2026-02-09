import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdynmkt_GetAllLegalMetadataItems request message
 *
 * Web API Action: msdynmkt_GetAllLegalMetadataItems
 */
export class msdynmkt_GetAllLegalMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetAllLegalMetadataItemsResponse>
{
  constructor(public msdynmkt_GetAllLegalMetadataItems_request_LanguageCode: number) {
    super("msdynmkt_GetAllLegalMetadataItems");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetAllLegalMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_GetAllLegalMetadataItemsResponse> {
    const data = await response.json();
    return msdynmkt_GetAllLegalMetadataItemsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_GetAllLegalMetadataItems_request_LanguageCode:
        this.msdynmkt_GetAllLegalMetadataItems_request_LanguageCode,
    };
  }
}

/**
 * msdynmkt_GetAllLegalMetadataItems response message
 */
export class msdynmkt_GetAllLegalMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdynmkt_GetAllLegalMetadataItems");
  }

  static fromResponse(data: unknown): msdynmkt_GetAllLegalMetadataItemsResponse {
    return new msdynmkt_GetAllLegalMetadataItemsResponse((data as any).value);
  }
}
