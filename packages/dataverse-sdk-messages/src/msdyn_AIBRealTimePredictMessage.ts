import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AIBRealTimePredictResponse as msdyn_AIBRealTimePredictResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_AIBRealTimePredictResponse.fromResponse({});
    return msdyn_AIBRealTimePredictResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AIBRealTimePredict response message
 */
export class msdyn_AIBRealTimePredictResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIBRealTimePredictResponseData) {
    super("msdyn_AIBRealTimePredict");
  }

  static fromResponse(data: unknown): msdyn_AIBRealTimePredictResponse {
    return new msdyn_AIBRealTimePredictResponse(
      responseObject<msdyn_AIBRealTimePredictResponseData>(data)
    );
  }
}
