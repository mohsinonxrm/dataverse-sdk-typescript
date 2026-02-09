import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckReqWebResourceOnSystemForm request message
 *
 * Web API Action: msdyn_CheckReqWebResourceOnSystemForm
 */
export class msdyn_CheckReqWebResourceOnSystemFormRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckReqWebResourceOnSystemFormResponse>
{
  constructor(public entityAndWebResourceList: string) {
    super("msdyn_CheckReqWebResourceOnSystemForm");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckReqWebResourceOnSystemForm`;

    const body: Record<string, unknown> = {
      EntityAndWebResourceList: this.entityAndWebResourceList,
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

  async parseResponse(response: Response): Promise<msdyn_CheckReqWebResourceOnSystemFormResponse> {
    const data = await response.json();
    return msdyn_CheckReqWebResourceOnSystemFormResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityAndWebResourceList: this.entityAndWebResourceList,
    };
  }
}

/**
 * msdyn_CheckReqWebResourceOnSystemForm response message
 */
export class msdyn_CheckReqWebResourceOnSystemFormResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckReqWebResourceOnSystemFormResponse) {
    super("msdyn_CheckReqWebResourceOnSystemForm");
  }

  static fromResponse(data: unknown): msdyn_CheckReqWebResourceOnSystemFormResponse {
    return new msdyn_CheckReqWebResourceOnSystemFormResponse((data as any).value);
  }
}
