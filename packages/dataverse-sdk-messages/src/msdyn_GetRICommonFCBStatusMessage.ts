import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetRICommonFCBStatusResponse as msdyn_GetRICommonFCBStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetRICommonFCBStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetRICommonFCBStatusRequestParameters {
  FCBName: string;
}

/**
 * msdyn_GetRICommonFCBStatus request message
 *
 * Web API Action: msdyn_GetRICommonFCBStatus
 */
export class msdyn_GetRICommonFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRICommonFCBStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetRICommonFCBStatusRequestParameters>;

  constructor(parameters: msdyn_GetRICommonFCBStatusRequestParameters) {
    super("msdyn_GetRICommonFCBStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRICommonFCBStatus`;

    const body = requestBody({
      FCBName: this.Parameters.FCBName,
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

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetRICommonFCBStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetRICommonFCBStatus response message
 */
export class msdyn_GetRICommonFCBStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRICommonFCBStatusResponseData) {
    super("msdyn_GetRICommonFCBStatus");
  }

  static fromResponse(data: unknown): msdyn_GetRICommonFCBStatusResponse {
    return new msdyn_GetRICommonFCBStatusResponse(
      responseObject<msdyn_GetRICommonFCBStatusResponseData>(data)
    );
  }
}
