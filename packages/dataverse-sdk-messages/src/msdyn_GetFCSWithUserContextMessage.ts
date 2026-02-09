import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetFCSWithUserContext request message
 *
 * Web API Action: msdyn_GetFCSWithUserContext
 */
export class msdyn_GetFCSWithUserContextRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFCSWithUserContextResponse>
{
  constructor(public msdyn_GetFCSWithUserContextInput: string) {
    super("msdyn_GetFCSWithUserContext");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSWithUserContext`;

    const body: Record<string, unknown> = {
      msdyn_GetFCSWithUserContextInput: this.msdyn_GetFCSWithUserContextInput,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSWithUserContextResponse> {
    const data = await response.json();
    return msdyn_GetFCSWithUserContextResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_GetFCSWithUserContextInput: this.msdyn_GetFCSWithUserContextInput,
    };
  }
}

/**
 * msdyn_GetFCSWithUserContext response message
 */
export class msdyn_GetFCSWithUserContextResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFCSWithUserContextResponse) {
    super("msdyn_GetFCSWithUserContext");
  }

  static fromResponse(data: unknown): msdyn_GetFCSWithUserContextResponse {
    return new msdyn_GetFCSWithUserContextResponse((data as any).value);
  }
}
