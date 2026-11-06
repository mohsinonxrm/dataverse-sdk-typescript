import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SIGetFCBStatusResponse as msdyn_SIGetFCBStatusResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SIGetFCBStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SIGetFCBStatusRequestParameters {
  FCBName: string;
}

/**
 * msdyn_SIGetFCBStatus request message
 *
 * Web API Action: msdyn_SIGetFCBStatus
 */
export class msdyn_SIGetFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SIGetFCBStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SIGetFCBStatusRequestParameters>;

  constructor(parameters: msdyn_SIGetFCBStatusRequestParameters) {
    super("msdyn_SIGetFCBStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SIGetFCBStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SIGetFCBStatus response message
 */
export class msdyn_SIGetFCBStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_SIGetFCBStatusResponseData) {
    super("msdyn_SIGetFCBStatus");
  }

  static fromResponse(data: unknown): msdyn_SIGetFCBStatusResponse {
    return new msdyn_SIGetFCBStatusResponse(responseObject<msdyn_SIGetFCBStatusResponseData>(data));
  }
}
