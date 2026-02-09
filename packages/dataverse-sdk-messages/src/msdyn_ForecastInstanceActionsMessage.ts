import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public webApiName: string,
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ForecastInstanceActionsResponse> {
    const data = await response.json();
    return msdyn_ForecastInstanceActionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ServiceName: this.serviceName,
      WebApiName: this.webApiName,
      RequestJson: this.requestJson,
    };
  }
}

/**
 * msdyn_ForecastInstanceActions response message
 */
export class msdyn_ForecastInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastInstanceActionsResponse) {
    super("msdyn_ForecastInstanceActions");
  }

  static fromResponse(data: unknown): msdyn_ForecastInstanceActionsResponse {
    return new msdyn_ForecastInstanceActionsResponse((data as any).value);
  }
}
