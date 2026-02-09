import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DynamicForecastRetrieval request message
 *
 * Web API Action: msdyn_DynamicForecastRetrieval
 */
export class msdyn_DynamicForecastRetrievalRequest
  extends OrganizationRequest
  implements Executable<msdyn_DynamicForecastRetrievalResponse>
{
  constructor(public msdyn_dynamicForecastRetrievalRequest: string) {
    super("msdyn_DynamicForecastRetrieval");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DynamicForecastRetrieval`;

    const body: Record<string, unknown> = {
      msdyn_dynamicForecastRetrievalRequest: this.msdyn_dynamicForecastRetrievalRequest,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_DynamicForecastRetrievalResponse> {
    const data = await response.json();
    return msdyn_DynamicForecastRetrievalResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_dynamicForecastRetrievalRequest: this.msdyn_dynamicForecastRetrievalRequest,
    };
  }
}

/**
 * msdyn_DynamicForecastRetrieval response message
 */
export class msdyn_DynamicForecastRetrievalResponse extends OrganizationResponse {
  constructor(public result: msdyn_DynamicForecastRetrievalResponse) {
    super("msdyn_DynamicForecastRetrieval");
  }

  static fromResponse(data: unknown): msdyn_DynamicForecastRetrievalResponse {
    return new msdyn_DynamicForecastRetrievalResponse((data as any).value);
  }
}
