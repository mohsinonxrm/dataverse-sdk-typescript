import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse = void;

/**
 * Parameters of the msdyn_AutonomousSQA_ProcessBANTAndPIExtraction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_ProcessBANTAndPIExtractionActionParameters {
  msdyn_Thread: string;
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
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
      msdyn_TrackingId: this.parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.parameters.msdyn_SalesAgentRun,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
