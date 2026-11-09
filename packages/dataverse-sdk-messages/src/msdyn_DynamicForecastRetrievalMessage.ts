import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DynamicForecastRetrieval message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DynamicForecastRetrievalRequestParameters {
  msdyn_dynamicForecastRetrievalRequest: string;
}

/**
 * msdyn_DynamicForecastRetrieval request message
 *
 * Web API Action: msdyn_DynamicForecastRetrieval
 */
export class msdyn_DynamicForecastRetrievalRequest
  extends OrganizationRequest
  implements Executable<msdyn_DynamicForecastRetrievalResponse>
{
  declare readonly Parameters: Readonly<msdyn_DynamicForecastRetrievalRequestParameters>;

  constructor(parameters: msdyn_DynamicForecastRetrievalRequestParameters) {
    super("msdyn_DynamicForecastRetrieval", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DynamicForecastRetrieval`;

    const body = requestBody({
      msdyn_dynamicForecastRetrievalRequest: this.Parameters.msdyn_dynamicForecastRetrievalRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DynamicForecastRetrievalResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DynamicForecastRetrievalResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DynamicForecastRetrieval action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DynamicForecastRetrievalResult {
  "@odata.context"?: string;
  msdyn_dynamicForecastRetrievalResponse: string;
}

/**
 * msdyn_DynamicForecastRetrieval response message
 *
 * `result` is the value the msdyn_DynamicForecastRetrieval action returns (see {@link msdyn_DynamicForecastRetrievalResult}).
 */
export class msdyn_DynamicForecastRetrievalResponse extends OrganizationResponse {
  constructor(public result: msdyn_DynamicForecastRetrievalResult) {
    super("msdyn_DynamicForecastRetrieval");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DynamicForecastRetrievalResponse {
    return new msdyn_DynamicForecastRetrievalResponse(data as msdyn_DynamicForecastRetrievalResult);
  }
}
