import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CancelDataProcessingModuleExecution action
 */
export interface msdyn_CancelDataProcessingModuleExecutionResponse {
  Response: string;
}

/**
 * msdyn_CancelDataProcessingModuleExecution action
 *
 * Unbound action
 */
export class msdyn_CancelDataProcessingModuleExecutionAction implements Executable<msdyn_CancelDataProcessingModuleExecutionResponse> {
  constructor(public readonly dataProcessingRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CancelDataProcessingModuleExecution`;

    const body: Record<string, unknown> = {
      DataProcessingRequest: this.dataProcessingRequest,
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
  ): Promise<msdyn_CancelDataProcessingModuleExecutionResponse> {
    const data = await response.json();
    return data as msdyn_CancelDataProcessingModuleExecutionResponse;
  }
}
