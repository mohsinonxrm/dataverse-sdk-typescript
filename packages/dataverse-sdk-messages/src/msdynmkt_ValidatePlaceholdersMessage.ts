import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ValidatePlaceholdersResponse as msdynmkt_ValidatePlaceholdersResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_ValidatePlaceholders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ValidatePlaceholdersRequestParameters {
  ValidatePlaceholdersRequest?: string;
}

/**
 * msdynmkt_ValidatePlaceholders request message
 *
 * Web API Action: msdynmkt_ValidatePlaceholders
 */
export class msdynmkt_ValidatePlaceholdersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ValidatePlaceholdersResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ValidatePlaceholdersRequestParameters>;

  constructor(parameters: msdynmkt_ValidatePlaceholdersRequestParameters = {}) {
    super("msdynmkt_ValidatePlaceholders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValidatePlaceholders`;

    const body = requestBody({
      ValidatePlaceholdersRequest: this.Parameters.ValidatePlaceholdersRequest,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_ValidatePlaceholdersResponse.fromResponse(text ? JSON.parse(text) : {});
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
