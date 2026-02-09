import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action
 */
export interface msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse {
  // No content returned
}

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionAction implements Executable<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse> {
  constructor(
    public readonly msdyn_Thread: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_TrackingId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProcessBANTAndPIExtraction`;

    const body: Record<string, unknown> = {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
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
  ): Promise<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
