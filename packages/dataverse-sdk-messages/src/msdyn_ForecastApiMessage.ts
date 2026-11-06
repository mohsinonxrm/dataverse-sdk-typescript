import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ForecastApi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ForecastApiRequestParameters {
  WebApiName: string;
  RequestJson?: string;
}

/**
 * msdyn_ForecastApi request message
 *
 * Web API Action: msdyn_ForecastApi
 */
export class msdyn_ForecastApiRequest
  extends OrganizationRequest
  implements Executable<msdyn_ForecastApiResponse>
{
  declare readonly Parameters: Readonly<msdyn_ForecastApiRequestParameters>;

  constructor(parameters: msdyn_ForecastApiRequestParameters) {
    super("msdyn_ForecastApi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastApi`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_ForecastApiResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ForecastApiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ForecastApi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ForecastApiResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_ForecastApi response message
 *
 * `result` is the value the msdyn_ForecastApi action returns (see {@link msdyn_ForecastApiResult}).
 */
export class msdyn_ForecastApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastApiResult) {
    super("msdyn_ForecastApi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ForecastApiResponse {
    return new msdyn_ForecastApiResponse(data as msdyn_ForecastApiResult);
  }
}
