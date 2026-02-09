import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CSCaseClosureProcessAgentResponse action
 */
export interface msdyn_CSCaseClosureProcessAgentResponseResponse {
  msdyn_response: string;
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse action
 *
 * Unbound action
 */
export class msdyn_CSCaseClosureProcessAgentResponseAction implements Executable<msdyn_CSCaseClosureProcessAgentResponseResponse> {
  constructor(public readonly msdyn_payload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseClosureProcessAgentResponse`;

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
  ): Promise<msdyn_CSCaseClosureProcessAgentResponseResponse> {
    const data = await response.json();
    return data as msdyn_CSCaseClosureProcessAgentResponseResponse;
  }
}
