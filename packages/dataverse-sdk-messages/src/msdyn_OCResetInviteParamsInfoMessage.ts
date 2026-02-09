import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OCResetInviteParamsInfo request message
 *
 * Web API Action: msdyn_OCResetInviteParamsInfo
 */
export class msdyn_OCResetInviteParamsInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_OCResetInviteParamsInfoResponse>
{
  constructor(public liveWorkItemId: string) {
    super("msdyn_OCResetInviteParamsInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetInviteParamsInfo`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_OCResetInviteParamsInfoResponse> {
    const data = await response.json();
    return msdyn_OCResetInviteParamsInfoResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LiveWorkItemId: this.liveWorkItemId,
    };
  }
}

/**
 * msdyn_OCResetInviteParamsInfo response message
 */
export class msdyn_OCResetInviteParamsInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_OCResetInviteParamsInfoResponse) {
    super("msdyn_OCResetInviteParamsInfo");
  }

  static fromResponse(data: unknown): msdyn_OCResetInviteParamsInfoResponse {
    return new msdyn_OCResetInviteParamsInfoResponse((data as any).value);
  }
}
