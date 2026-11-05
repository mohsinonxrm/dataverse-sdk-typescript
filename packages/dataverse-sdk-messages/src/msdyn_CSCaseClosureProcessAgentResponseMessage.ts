import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CSCaseClosureProcessAgentResponse request message
 *
 * Web API Action: msdyn_CSCaseClosureProcessAgentResponse
 */
export class msdyn_CSCaseClosureProcessAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCaseClosureProcessAgentResponseResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_CSCaseClosureProcessAgentResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseClosureProcessAgentResponse`;

    const body: Record<string, unknown> = {
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CSCaseClosureProcessAgentResponseResponse> {
    const data = await response.json();
    return msdyn_CSCaseClosureProcessAgentResponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse response message
 */
export class msdyn_CSCaseClosureProcessAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseClosureProcessAgentResponseResponse) {
    super("msdyn_CSCaseClosureProcessAgentResponse");
  }

  static fromResponse(data: unknown): msdyn_CSCaseClosureProcessAgentResponseResponse {
    return new msdyn_CSCaseClosureProcessAgentResponseResponse((data as any).value);
  }
}
