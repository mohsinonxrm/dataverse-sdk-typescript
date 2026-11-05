import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DoesKBExist request message
 *
 * Web API Action: msdyn_DoesKBExist
 */
export class msdyn_DoesKBExistRequest
  extends OrganizationRequest
  implements Executable<msdyn_DoesKBExistResponse>
{
  constructor(public cSCopilotRequest: string) {
    super("msdyn_DoesKBExist");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DoesKBExist`;

    const body: Record<string, unknown> = {
      CSCopilotRequest: this.cSCopilotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DoesKBExistResponse> {
    const data = await response.json();
    return msdyn_DoesKBExistResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CSCopilotRequest: this.cSCopilotRequest,
    };
  }
}

/**
 * msdyn_DoesKBExist response message
 */
export class msdyn_DoesKBExistResponse extends OrganizationResponse {
  constructor(public result: msdyn_DoesKBExistResponse) {
    super("msdyn_DoesKBExist");
  }

  static fromResponse(data: unknown): msdyn_DoesKBExistResponse {
    return new msdyn_DoesKBExistResponse((data as any).value);
  }
}
