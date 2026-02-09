import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent request message
 *
 * Web API Action: msdyn_GetMessageForCaseFollowupAndClosureAgent
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageForCaseFollowupAndClosureAgent`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
    const data = await response.json();
    return msdyn_GetMessageForCaseFollowupAndClosureAgentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent response message
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageForCaseFollowupAndClosureAgentResponse) {
    super("msdyn_GetMessageForCaseFollowupAndClosureAgent");
  }

  static fromResponse(data: unknown): msdyn_GetMessageForCaseFollowupAndClosureAgentResponse {
    return new msdyn_GetMessageForCaseFollowupAndClosureAgentResponse((data as any).value);
  }
}
