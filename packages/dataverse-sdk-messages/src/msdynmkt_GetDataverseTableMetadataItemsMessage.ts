import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdynmkt_GetDataverseTableMetadataItems request message
 *
 * Web API Action: msdynmkt_GetDataverseTableMetadataItems
 */
export class msdynmkt_GetDataverseTableMetadataItemsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_GetDataverseTableMetadataItemsResponse>
{
  constructor(
    public msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode: number,
    public msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames: string[],
    public msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading: boolean
  ) {
    super("msdynmkt_GetDataverseTableMetadataItems");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_GetDataverseTableMetadataItems`;

    const body: Record<string, unknown> = {
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_GetDataverseTableMetadataItemsResponse> {
    const data = await response.json();
    return msdynmkt_GetDataverseTableMetadataItemsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode:
        this.msdynmkt_GetDataverseTableMetadataItems_request_LanguageCode,
      msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames:
        this.msdynmkt_GetDataverseTableMetadataItems_request_SourceLogicalNames,
      msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading:
        this.msdynmkt_GetDataverseTableMetadataItems_request_UseLazyLoading,
    };
  }
}

/**
 * msdynmkt_GetDataverseTableMetadataItems response message
 */
export class msdynmkt_GetDataverseTableMetadataItemsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdynmkt_GetDataverseTableMetadataItems");
  }

  static fromResponse(data: unknown): msdynmkt_GetDataverseTableMetadataItemsResponse {
    return new msdynmkt_GetDataverseTableMetadataItemsResponse((data as any).value);
  }
}
