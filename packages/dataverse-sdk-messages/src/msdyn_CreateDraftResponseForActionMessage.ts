import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateDraftResponseForAction request message
 *
 * Web API Action: msdyn_CreateDraftResponseForAction
 */
export class msdyn_CreateDraftResponseForActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateDraftResponseForActionResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_CreateDraftResponseForAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateDraftResponseForAction`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateDraftResponseForActionResponse> {
    const data = await response.json();
    return msdyn_CreateDraftResponseForActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_CreateDraftResponseForAction response message
 */
export class msdyn_CreateDraftResponseForActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateDraftResponseForActionResponse) {
    super("msdyn_CreateDraftResponseForAction");
  }

  static fromResponse(data: unknown): msdyn_CreateDraftResponseForActionResponse {
    return new msdyn_CreateDraftResponseForActionResponse((data as any).value);
  }
}
