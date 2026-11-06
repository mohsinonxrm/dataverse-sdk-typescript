import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_QueryExchange message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueryExchangeRequestParameters {
  method: string;
  body: string;
  requesturl: string;
}

/**
 * msdyn_QueryExchange request message
 *
 * Web API Action: msdyn_QueryExchange
 */
export class msdyn_QueryExchangeRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueryExchangeResponse>
{
  declare readonly Parameters: Readonly<msdyn_QueryExchangeRequestParameters>;

  constructor(parameters: msdyn_QueryExchangeRequestParameters) {
    super("msdyn_QueryExchange", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueryExchange`;

    const body = requestBody({
      method: this.Parameters.method,
      body: this.Parameters.body,
      requesturl: this.Parameters.requesturl,
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

  async parseResponse(response: Response): Promise<msdyn_QueryExchangeResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_QueryExchangeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_QueryExchange action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueryExchangeResult {
  "@odata.context"?: string;
  ExchangeData: string;
}

/**
 * msdyn_QueryExchange response message
 *
 * `result` is the value the msdyn_QueryExchange action returns (see {@link msdyn_QueryExchangeResult}).
 */
export class msdyn_QueryExchangeResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueryExchangeResult) {
    super("msdyn_QueryExchange");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_QueryExchangeResponse {
    return new msdyn_QueryExchangeResponse(data as msdyn_QueryExchangeResult);
  }
}
