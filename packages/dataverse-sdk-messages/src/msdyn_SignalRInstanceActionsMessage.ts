import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SignalRInstanceActionsResponse as msdyn_SignalRInstanceActionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SignalRInstanceActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SignalRInstanceActionsRequestParameters {
  ServiceName: string;
  WebApiName: string;
  RequestJson: string;
}

/**
 * msdyn_SignalRInstanceActions request message
 *
 * Web API Action: msdyn_SignalRInstanceActions
 */
export class msdyn_SignalRInstanceActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_SignalRInstanceActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_SignalRInstanceActionsRequestParameters>;

  constructor(parameters: msdyn_SignalRInstanceActionsRequestParameters) {
    super("msdyn_SignalRInstanceActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SignalRInstanceActions`;

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

  async parseResponse(response: Response): Promise<msdyn_SignalRInstanceActionsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SignalRInstanceActionsResponse.fromResponse(text ? JSON.parse(text) : {});
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
