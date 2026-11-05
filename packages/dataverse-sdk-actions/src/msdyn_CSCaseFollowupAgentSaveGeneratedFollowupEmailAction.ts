import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
  msdyn_response: string;
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action
 *
 * Unbound action
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailAction implements Executable<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse> {
  constructor(public readonly msdyn_payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail`;

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
  ): Promise<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse> {
    const data = await response.json();
    return data as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse;
  }
}
