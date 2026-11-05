import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OCResetLastMessageInfo request message
 *
 * Web API Action: msdyn_OCResetLastMessageInfo
 */
export class msdyn_OCResetLastMessageInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_OCResetLastMessageInfoResponse>
{
  constructor(public liveWorkItemId: string) {
    super("msdyn_OCResetLastMessageInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetLastMessageInfo`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_OCResetLastMessageInfoResponse> {
    const data = await response.json();
    return msdyn_OCResetLastMessageInfoResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LiveWorkItemId: this.liveWorkItemId,
    };
  }
}

/**
 * msdyn_OCResetLastMessageInfo response message
 */
export class msdyn_OCResetLastMessageInfoResponse extends OrganizationResponse {
  constructor(public result: msdyn_OCResetLastMessageInfoResponse) {
    super("msdyn_OCResetLastMessageInfo");
  }

  static fromResponse(data: unknown): msdyn_OCResetLastMessageInfoResponse {
    return new msdyn_OCResetLastMessageInfoResponse((data as any).value);
  }
}
