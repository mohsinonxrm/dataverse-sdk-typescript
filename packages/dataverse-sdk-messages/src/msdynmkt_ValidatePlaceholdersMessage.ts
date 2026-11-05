import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_ValidatePlaceholdersResponse as msdynmkt_ValidatePlaceholdersResponseData } from "./types/index.js";

/**
 * msdynmkt_ValidatePlaceholders request message
 *
 * Web API Action: msdynmkt_ValidatePlaceholders
 */
export class msdynmkt_ValidatePlaceholdersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ValidatePlaceholdersResponse>
{
  constructor(public validatePlaceholdersRequest: string) {
    super("msdynmkt_ValidatePlaceholders");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValidatePlaceholders`;

    const body: Record<string, unknown> = {
      ValidatePlaceholdersRequest: this.validatePlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ValidatePlaceholdersResponse> {
    const data = await response.json();
    return msdynmkt_ValidatePlaceholdersResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_ValidatePlaceholders response message
 */
export class msdynmkt_ValidatePlaceholdersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ValidatePlaceholdersResponseData) {
    super("msdynmkt_ValidatePlaceholders");
  }

  static fromResponse(data: unknown): msdynmkt_ValidatePlaceholdersResponse {
    return new msdynmkt_ValidatePlaceholdersResponse(
      responseObject<msdynmkt_ValidatePlaceholdersResponseData>(data)
    );
  }
}
