import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SignalRInstanceActionsResponse as msdyn_SignalRInstanceActionsResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SignalRInstanceActionsResponse> {
    const data = await response.json();
    return msdyn_SignalRInstanceActionsResponse.fromResponse(data);
  }
}

/**
 * msdyn_SignalRInstanceActions response message
 */
export class msdyn_SignalRInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SignalRInstanceActionsResponseData) {
    super("msdyn_SignalRInstanceActions");
  }

  static fromResponse(data: unknown): msdyn_SignalRInstanceActionsResponse {
    return new msdyn_SignalRInstanceActionsResponse(
      responseObject<msdyn_SignalRInstanceActionsResponseData>(data)
    );
  }
}
