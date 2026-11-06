import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetWidgetsDataResponse as msdyn_GetWidgetsDataResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetWidgetsData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWidgetsDataRequestParameters {
  msdyn_request: string;
  msdyn_entityname?: string;
  msdyn_widgettype: string;
  msdyn_widgetid: string;
  msdyn_recordid?: string;
}

/**
 * msdyn_GetWidgetsData request message
 *
 * Web API Action: msdyn_GetWidgetsData
 */
export class msdyn_GetWidgetsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWidgetsDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetWidgetsDataRequestParameters>;

  constructor(parameters: msdyn_GetWidgetsDataRequestParameters) {
    super("msdyn_GetWidgetsData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWidgetsData`;

    const body = requestBody({
      msdyn_request: this.Parameters.msdyn_request,
      msdyn_entityname: this.Parameters.msdyn_entityname,
      msdyn_widgettype: this.Parameters.msdyn_widgettype,
      msdyn_widgetid: this.Parameters.msdyn_widgetid,
      msdyn_recordid: this.Parameters.msdyn_recordid,
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

  async parseResponse(response: Response): Promise<msdyn_GetWidgetsDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetWidgetsDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetWidgetsData response message
 */
export class msdyn_GetWidgetsDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWidgetsDataResponseData) {
    super("msdyn_GetWidgetsData");
  }

  static fromResponse(data: unknown): msdyn_GetWidgetsDataResponse {
    return new msdyn_GetWidgetsDataResponse(responseObject<msdyn_GetWidgetsDataResponseData>(data));
  }
}
