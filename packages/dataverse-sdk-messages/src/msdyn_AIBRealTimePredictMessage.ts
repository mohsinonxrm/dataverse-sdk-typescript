import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AIBRealTimePredict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIBRealTimePredictRequestParameters {
  SuggestionType: string;
  Filters: string;
  Context: string;
  SuggestionFor: string;
  Version: string;
}

/**
 * msdyn_AIBRealTimePredict request message
 *
 * Web API Action: msdyn_AIBRealTimePredict
 */
export class msdyn_AIBRealTimePredictRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIBRealTimePredictResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIBRealTimePredictRequestParameters>;

  constructor(parameters: msdyn_AIBRealTimePredictRequestParameters) {
    super("msdyn_AIBRealTimePredict", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIBRealTimePredict`;

    const body = requestBody({
      SuggestionType: this.Parameters.SuggestionType,
      Filters: this.Parameters.Filters,
      Context: this.Parameters.Context,
      SuggestionFor: this.Parameters.SuggestionFor,
      Version: this.Parameters.Version,
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

  async parseResponse(response: Response): Promise<msdyn_AIBRealTimePredictResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AIBRealTimePredictResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AIBRealTimePredict action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIBRealTimePredictResult {
  "@odata.context"?: string;
  Suggestions: string;
}

/**
 * msdyn_AIBRealTimePredict response message
 *
 * `result` is the value the msdyn_AIBRealTimePredict action returns (see {@link msdyn_AIBRealTimePredictResult}).
 */
export class msdyn_AIBRealTimePredictResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIBRealTimePredictResult) {
    super("msdyn_AIBRealTimePredict");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AIBRealTimePredictResponse {
    return new msdyn_AIBRealTimePredictResponse(data as msdyn_AIBRealTimePredictResult);
  }
}
