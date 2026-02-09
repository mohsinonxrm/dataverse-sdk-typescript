import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_invokeCustomAgentForCaseProcessingAgent action
 */
export interface msdyn_invokeCustomAgentForCaseProcessingAgentResponse {
  // No content returned
}

/**
 * msdyn_invokeCustomAgentForCaseProcessingAgent action
 *
 * Unbound action
 */
export class msdyn_invokeCustomAgentForCaseProcessingAgentAction implements Executable<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
  constructor(
    public readonly msdyn_caseProcessingAgentDetails: string,
    public readonly msdyn_customAgentDetails: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCustomAgentForCaseProcessingAgent`;

    const body: Record<string, unknown> = {
      msdyn_caseProcessingAgentDetails: this.msdyn_caseProcessingAgentDetails,
      msdyn_customAgentDetails: this.msdyn_customAgentDetails,
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
  ): Promise<msdyn_invokeCustomAgentForCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
