import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAdaptiveCardResponseResponse as msdyn_SalesAdaptiveCardResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesAdaptiveCardResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAdaptiveCardResponseRequestParameters {
  msdyn_query?: string;
  msdyn_id?: string;
  msdyn_scenario: number;
}

/**
 * msdyn_SalesAdaptiveCardResponse request message
 *
 * Web API Action: msdyn_SalesAdaptiveCardResponse
 */
export class msdyn_SalesAdaptiveCardResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAdaptiveCardResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAdaptiveCardResponseRequestParameters>;

  constructor(parameters: msdyn_SalesAdaptiveCardResponseRequestParameters) {
    super("msdyn_SalesAdaptiveCardResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAdaptiveCardResponse`;

    const body = requestBody({
      msdyn_query: this.Parameters.msdyn_query,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_scenario: this.Parameters.msdyn_scenario,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAdaptiveCardResponseResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SalesAdaptiveCardResponseResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SalesAdaptiveCardResponse response message
 */
export class msdyn_SalesAdaptiveCardResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAdaptiveCardResponseResponseData) {
    super("msdyn_SalesAdaptiveCardResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAdaptiveCardResponseResponse {
    return new msdyn_SalesAdaptiveCardResponseResponse(
      responseObject<msdyn_SalesAdaptiveCardResponseResponseData>(data)
    );
  }
}
