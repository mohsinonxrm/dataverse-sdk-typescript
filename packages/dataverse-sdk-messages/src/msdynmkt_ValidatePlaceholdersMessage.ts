import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdynmkt_ValidatePlaceholdersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ValidatePlaceholders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ValidatePlaceholdersResult {
  "@odata.context"?: string;
  ValidatePlaceholdersResult: string;
}

/**
 * msdynmkt_ValidatePlaceholders response message
 *
 * `result` is the value the msdynmkt_ValidatePlaceholders action returns (see {@link msdynmkt_ValidatePlaceholdersResult}).
 */
export class msdynmkt_ValidatePlaceholdersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ValidatePlaceholdersResult) {
    super("msdynmkt_ValidatePlaceholders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ValidatePlaceholdersResponse {
    return new msdynmkt_ValidatePlaceholdersResponse(data as msdynmkt_ValidatePlaceholdersResult);
  }
}
