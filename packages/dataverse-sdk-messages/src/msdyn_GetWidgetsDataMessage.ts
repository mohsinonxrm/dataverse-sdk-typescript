import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetWidgetsData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetWidgetsDataRequestParameters {
  msdyn_entityname?: string;
  msdyn_recordid?: string;
  msdyn_request: string;
  msdyn_widgettype: string;
  msdyn_widgetid: string;
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
      msdyn_entityname: this.Parameters.msdyn_entityname,
      msdyn_recordid: this.Parameters.msdyn_recordid,
      msdyn_request: this.Parameters.msdyn_request,
      msdyn_widgettype: this.Parameters.msdyn_widgettype,
      msdyn_widgetid: this.Parameters.msdyn_widgetid,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetWidgetsDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetWidgetsData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetWidgetsDataResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetWidgetsData response message
 *
 * `result` is the value the msdyn_GetWidgetsData action returns (see {@link msdyn_GetWidgetsDataResult}).
 */
export class msdyn_GetWidgetsDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetWidgetsDataResult) {
    super("msdyn_GetWidgetsData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetWidgetsDataResponse {
    return new msdyn_GetWidgetsDataResponse(data as msdyn_GetWidgetsDataResult);
  }
}
