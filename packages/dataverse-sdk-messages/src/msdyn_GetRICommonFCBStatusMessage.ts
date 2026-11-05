import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetRICommonFCBStatusResponse as msdyn_GetRICommonFCBStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetRICommonFCBStatus request message
 *
 * Web API Action: msdyn_GetRICommonFCBStatus
 */
export class msdyn_GetRICommonFCBStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetRICommonFCBStatusResponse>
{
  constructor(public fCBName: string) {
    super("msdyn_GetRICommonFCBStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRICommonFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    const data = await response.json();
    return msdyn_GetRICommonFCBStatusResponse.fromResponse(data);
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
