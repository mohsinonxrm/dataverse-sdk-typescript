import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAdaptiveCardResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAdaptiveCardResponseRequestParameters {
  msdyn_scenario: number;
  msdyn_id?: string;
  msdyn_query?: string;
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
      msdyn_scenario: this.Parameters.msdyn_scenario,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_query: this.Parameters.msdyn_query,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAdaptiveCardResponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAdaptiveCardResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAdaptiveCardResponseResult {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * msdyn_SalesAdaptiveCardResponse response message
 *
 * `result` is the value the msdyn_SalesAdaptiveCardResponse action returns (see {@link msdyn_SalesAdaptiveCardResponseResult}).
 */
export class msdyn_SalesAdaptiveCardResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAdaptiveCardResponseResult) {
    super("msdyn_SalesAdaptiveCardResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAdaptiveCardResponseResponse {
    return new msdyn_SalesAdaptiveCardResponseResponse(
      data as msdyn_SalesAdaptiveCardResponseResult
    );
  }
}
