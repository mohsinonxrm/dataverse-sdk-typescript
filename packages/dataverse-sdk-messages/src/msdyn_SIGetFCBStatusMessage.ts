import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SIGetFCBStatusResponse as msdyn_SIGetFCBStatusResponseData } from "./types/index.js";

/**
 * msdyn_SIGetFCBStatus request message
 *
 * Web API Action: msdyn_SIGetFCBStatus
 */
export class msdyn_SIGetFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SIGetFCBStatusResponse>
{
  constructor(public fCBName: string) {
    super("msdyn_SIGetFCBStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

    const body: Record<string, unknown> = {
      FCBName: this.fCBName,
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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    const data = await response.json();
    return msdyn_SIGetFCBStatusResponse.fromResponse(data);
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
