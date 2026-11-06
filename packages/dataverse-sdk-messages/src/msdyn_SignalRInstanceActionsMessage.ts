import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SignalRInstanceActionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SignalRInstanceActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SignalRInstanceActionsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_SignalRInstanceActions response message
 *
 * `result` is the value the msdyn_SignalRInstanceActions action returns (see {@link msdyn_SignalRInstanceActionsResult}).
 */
export class msdyn_SignalRInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_SignalRInstanceActionsResult) {
    super("msdyn_SignalRInstanceActions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SignalRInstanceActionsResponse {
    return new msdyn_SignalRInstanceActionsResponse(data as msdyn_SignalRInstanceActionsResult);
  }
}
