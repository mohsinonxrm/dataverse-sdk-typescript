import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DynamicForecastRetrievalResponse as msdyn_DynamicForecastRetrievalResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DynamicForecastRetrievalResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DynamicForecastRetrieval response message
 */
export class msdyn_DynamicForecastRetrievalResponse extends OrganizationResponse {
  constructor(public result: msdyn_DynamicForecastRetrievalResponseData) {
    super("msdyn_DynamicForecastRetrieval");
  }

  static fromResponse(data: unknown): msdyn_DynamicForecastRetrievalResponse {
    return new msdyn_DynamicForecastRetrievalResponse(
      responseObject<msdyn_DynamicForecastRetrievalResponseData>(data)
    );
  }
}
