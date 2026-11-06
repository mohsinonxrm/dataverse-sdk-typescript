import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ForecastApiResponse as msdyn_ForecastApiResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ForecastApiResponse.fromResponse({});
    return msdyn_ForecastApiResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ForecastApi response message
 */
export class msdyn_ForecastApiResponse extends OrganizationResponse {
  constructor(public result: msdyn_ForecastApiResponseData) {
    super("msdyn_ForecastApi");
  }

  static fromResponse(data: unknown): msdyn_ForecastApiResponse {
    return new msdyn_ForecastApiResponse(responseObject<msdyn_ForecastApiResponseData>(data));
  }
}
