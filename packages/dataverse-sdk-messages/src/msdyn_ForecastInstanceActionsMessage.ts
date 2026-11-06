import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ForecastInstanceActionsResponse as msdyn_ForecastInstanceActionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ForecastInstanceActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastInstanceActionsRequestParameters {
  ServiceName: string;
  WebApiName?: string;
  RequestJson: string;
}

/**
 * msdyn_ForecastInstanceActions request message
 *
 * Web API Action: msdyn_ForecastInstanceActions
 */
export class msdyn_ForecastInstanceActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastInstanceActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ForecastInstanceActionsRequestParameters>;

  constructor(parameters: msdyn_ForecastInstanceActionsRequestParameters) {
    super("msdyn_ForecastInstanceActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastInstanceActions`;

    const body = requestBody({
      ServiceName: this.Parameters.ServiceName,
      WebApiName: this.Parameters.WebApiName,
      RequestJson: this.Parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_ForecastInstanceActionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ForecastInstanceActionsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ForecastInstanceActions response message
 */
export class msdyn_ForecastInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastInstanceActionsResponseData) {
    super("msdyn_ForecastInstanceActions");
  }

  static fromResponse(data: unknown): msdyn_ForecastInstanceActionsResponse {
    return new msdyn_ForecastInstanceActionsResponse(
      responseObject<msdyn_ForecastInstanceActionsResponseData>(data)
    );
  }
}
