import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetMessageForCaseFollowupAndClosureAgent action
 */
export interface msdyn_GetMessageForCaseFollowupAndClosureAgentResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetMessageForCaseFollowupAndClosureAgent action
 *
 * Unbound action
 */
export class msdyn_GetMessageForCaseFollowupAndClosureAgentAction implements Executable<msdyn_GetMessageForCaseFollowupAndClosureAgentResponse> {
  constructor(public readonly msdyn_payload: string) {}

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
    return data as msdyn_GetMessageForCaseFollowupAndClosureAgentResponse;
  }
}
