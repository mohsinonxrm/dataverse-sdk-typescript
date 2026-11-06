import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action
 */
export interface msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_ProcessBANTAndPIExtractionActionParameters {
  msdyn_Thread: string;
  msdyn_SalesAgentRun: string;
  msdyn_TrackingId: string;
}

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action
 *
 * Unbound action
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionAction implements Executable<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse> {
  constructor(
    public readonly parameters: msdyn_AutonomousSQA_ProcessBANTAndPIExtractionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProcessBANTAndPIExtraction`;

    const body = requestBody({
      msdyn_Thread: this.parameters.msdyn_Thread,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
    });

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
  ): Promise<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse;
  }
}
