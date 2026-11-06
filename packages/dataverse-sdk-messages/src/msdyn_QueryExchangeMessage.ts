import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_QueryExchangeResponse as msdyn_QueryExchangeResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_QueryExchangeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_QueryExchange response message
 */
export class msdyn_QueryExchangeResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueryExchangeResponseData) {
    super("msdyn_QueryExchange");
  }

  static fromResponse(data: unknown): msdyn_QueryExchangeResponse {
    return new msdyn_QueryExchangeResponse(responseObject<msdyn_QueryExchangeResponseData>(data));
  }
}
