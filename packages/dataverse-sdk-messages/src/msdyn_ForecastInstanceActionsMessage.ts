import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ForecastInstanceActionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ForecastInstanceActions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ForecastInstanceActionsResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_ForecastInstanceActions response message
 *
 * `result` is the value the msdyn_ForecastInstanceActions action returns (see {@link msdyn_ForecastInstanceActionsResult}).
 */
export class msdyn_ForecastInstanceActionsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastInstanceActionsResult) {
    super("msdyn_ForecastInstanceActions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ForecastInstanceActionsResponse {
    return new msdyn_ForecastInstanceActionsResponse(data as msdyn_ForecastInstanceActionsResult);
  }
}
