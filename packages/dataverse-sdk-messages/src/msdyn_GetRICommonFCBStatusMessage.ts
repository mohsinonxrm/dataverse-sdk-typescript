import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    const data = await response.json();
    return msdyn_GetRICommonFCBStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FCBName: this.fCBName,
    };
  }
}

/**
 * msdyn_GetRICommonFCBStatus response message
 */
export class msdyn_GetRICommonFCBStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetRICommonFCBStatusResponse) {
    super("msdyn_GetRICommonFCBStatus");
  }

  static fromResponse(data: unknown): msdyn_GetRICommonFCBStatusResponse {
    return new msdyn_GetRICommonFCBStatusResponse((data as any).value);
  }
}
