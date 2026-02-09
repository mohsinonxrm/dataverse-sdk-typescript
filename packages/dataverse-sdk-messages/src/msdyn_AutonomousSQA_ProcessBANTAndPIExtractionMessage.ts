import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction request message
 *
 * Web API Action: msdyn_AutonomousSQA_ProcessBANTAndPIExtraction
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse>
{
  constructor(
    public msdyn_Thread: string,
    public msdyn_SalesAgentRun: string,
    public msdyn_TrackingId: string
  ) {
    super("msdyn_AutonomousSQA_ProcessBANTAndPIExtraction");
  }

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
    return new msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_Thread: this.msdyn_Thread,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_TrackingId: this.msdyn_TrackingId,
    };
  }
}

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction response message
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_ProcessBANTAndPIExtraction");
  }

  static fromResponse(_data: unknown): msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse {
    return new msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse();
  }
}
