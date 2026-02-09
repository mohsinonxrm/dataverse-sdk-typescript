import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SignalRInstanceActions request message
 *
 * Web API Action: msdyn_SignalRInstanceActions
 */
export class msdyn_SignalRInstanceActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SignalRInstanceActionsResponse>
{
  constructor(
    public serviceName: string,
    public webApiName: string,
    public requestJson: string
  ) {
    super("msdyn_SignalRInstanceActions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SignalRInstanceActions`;

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

  async parseResponse(response: Response): Promise<msdyn_SignalRInstanceActionsResponse> {
    const data = await response.json();
    return msdyn_SignalRInstanceActionsResponse.fromResponse(data);
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
 * msdyn_SignalRInstanceActions response message
 */
export class msdyn_SignalRInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SignalRInstanceActionsResponse) {
    super("msdyn_SignalRInstanceActions");
  }

  static fromResponse(data: unknown): msdyn_SignalRInstanceActionsResponse {
    return new msdyn_SignalRInstanceActionsResponse((data as any).value);
  }
}
