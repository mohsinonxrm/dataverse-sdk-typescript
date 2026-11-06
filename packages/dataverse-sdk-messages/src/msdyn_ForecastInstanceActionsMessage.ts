import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ForecastInstanceActionsResponse as msdyn_ForecastInstanceActionsResponseData } from "./types/index.js";

/**
 * msdyn_ForecastInstanceActions request message
 *
 * Web API Action: msdyn_ForecastInstanceActions
 */
export class msdyn_ForecastInstanceActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastInstanceActionsResponse>
{
  constructor(
    public serviceName: string,
    public webApiName: string | undefined,
    public requestJson: string
  ) {
    super("msdyn_ForecastInstanceActions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastInstanceActions`;

    const body: Record<string, unknown> = {
      ServiceName: this.serviceName,
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
    };

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
    const data = await response.json();
    return msdyn_ForecastInstanceActionsResponse.fromResponse(data);
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
