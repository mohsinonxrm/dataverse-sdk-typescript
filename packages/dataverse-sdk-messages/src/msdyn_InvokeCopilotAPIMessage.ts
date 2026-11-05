import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InvokeCopilotAPI request message
 *
 * Web API Action: msdyn_InvokeCopilotAPI
 */
export class msdyn_InvokeCopilotAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeCopilotAPIResponse>
{
  constructor(
    public msdyn_APIName: string,
    public msdyn_payload: string
  ) {
    super("msdyn_InvokeCopilotAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeCopilotAPI`;

    const body: Record<string, unknown> = {
      msdyn_APIName: this.msdyn_APIName,
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeCopilotAPIResponse> {
    const data = await response.json();
    return msdyn_InvokeCopilotAPIResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_APIName: this.msdyn_APIName,
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_InvokeCopilotAPI response message
 */
export class msdyn_InvokeCopilotAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeCopilotAPIResponse) {
    super("msdyn_InvokeCopilotAPI");
  }

  static fromResponse(data: unknown): msdyn_InvokeCopilotAPIResponse {
    return new msdyn_InvokeCopilotAPIResponse((data as any).value);
  }
}
