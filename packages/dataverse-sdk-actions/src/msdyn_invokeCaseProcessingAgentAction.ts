import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_invokeCaseProcessingAgent action
 */
export interface msdyn_invokeCaseProcessingAgentResponse {
  // No content returned
}

/**
 * msdyn_invokeCaseProcessingAgent action
 *
 * Unbound action
 */
export class msdyn_invokeCaseProcessingAgentAction implements Executable<msdyn_invokeCaseProcessingAgentResponse> {
  constructor(
    public readonly msdyn_incidentId: string,
    public readonly msdyn_actions: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_invokeCaseProcessingAgent`;

    const body: Record<string, unknown> = {
      msdyn_incidentId: this.msdyn_incidentId,
      msdyn_actions: this.msdyn_actions,
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

  async parseResponse(response: Response): Promise<msdyn_invokeCaseProcessingAgentResponse> {
    // No return value (204 No Content)
    return {};
  }
}
