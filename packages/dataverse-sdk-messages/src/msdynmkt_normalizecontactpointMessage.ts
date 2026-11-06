import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_normalizecontactpoint message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_normalizecontactpointRequestParameters {
  msdynmkt_contactpointvalue: string;
  msdynmkt_contactpointtype: number;
}

/**
 * msdynmkt_normalizecontactpoint request message
 *
 * Web API Action: msdynmkt_normalizecontactpoint
 */
export class msdynmkt_normalizecontactpointRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_normalizecontactpointResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_normalizecontactpointRequestParameters>;

  constructor(parameters: msdynmkt_normalizecontactpointRequestParameters) {
    super("msdynmkt_normalizecontactpoint", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_normalizecontactpoint`;

    const body = requestBody({
      msdynmkt_contactpointvalue: this.Parameters.msdynmkt_contactpointvalue,
      msdynmkt_contactpointtype: this.Parameters.msdynmkt_contactpointtype,
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

  async parseResponse(response: Response): Promise<msdynmkt_normalizecontactpointResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_normalizecontactpointResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_normalizecontactpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_normalizecontactpointResult {
  "@odata.context"?: string;
  msdynmkt_normalizedcontactpointvalue: string;
}

/**
 * msdynmkt_normalizecontactpoint response message
 *
 * `result` is the value the msdynmkt_normalizecontactpoint action returns (see {@link msdynmkt_normalizecontactpointResult}).
 */
export class msdynmkt_normalizecontactpointResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_normalizecontactpointResult) {
    super("msdynmkt_normalizecontactpoint");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_normalizecontactpointResponse {
    return new msdynmkt_normalizecontactpointResponse(data as msdynmkt_normalizecontactpointResult);
  }
}
