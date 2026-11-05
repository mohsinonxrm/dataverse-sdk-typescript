import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetWidgetsDataResponse as msdyn_GetWidgetsDataResponseData } from "./types/index.js";

/**
 * msdyn_GetWidgetsData request message
 *
 * Web API Action: msdyn_GetWidgetsData
 */
export class msdyn_GetWidgetsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetWidgetsDataResponse>
{
  constructor(
    public msdyn_request: string,
    public msdyn_entityname: string,
    public msdyn_widgettype: string,
    public msdyn_widgetid: string,
    public msdyn_recordid: string
  ) {
    super("msdyn_GetWidgetsData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetWidgetsData`;

    const body: Record<string, unknown> = {
      msdyn_request: this.msdyn_request,
      msdyn_entityname: this.msdyn_entityname,
      msdyn_widgettype: this.msdyn_widgettype,
      msdyn_widgetid: this.msdyn_widgetid,
      msdyn_recordid: this.msdyn_recordid,
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

  async parseResponse(response: Response): Promise<msdyn_GetWidgetsDataResponse> {
    const data = await response.json();
    return msdyn_GetWidgetsDataResponse.fromResponse(data);
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
