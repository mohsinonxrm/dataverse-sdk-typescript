import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutonomousSQA_ProcessBANTAndPIExtraction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequestParameters {
  msdyn_Thread: string;
  msdyn_TrackingId: string;
  msdyn_SalesAgentRun: string;
}

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction request message
 *
 * Web API Action: msdyn_AutonomousSQA_ProcessBANTAndPIExtraction
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequestParameters>;

  constructor(parameters: msdyn_AutonomousSQA_ProcessBANTAndPIExtractionRequestParameters) {
    super("msdyn_AutonomousSQA_ProcessBANTAndPIExtraction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutonomousSQA_ProcessBANTAndPIExtraction`;

    const body = requestBody({
      msdyn_Thread: this.Parameters.msdyn_Thread,
      msdyn_TrackingId: this.Parameters.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.Parameters.msdyn_SalesAgentRun,
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
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse());
  }
}

/**
 * msdyn_AutonomousSQA_ProcessBANTAndPIExtraction response message
 */
export class msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutonomousSQA_ProcessBANTAndPIExtraction");
  }

  static fromResponse(_data?: unknown): msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse {
    return new msdyn_AutonomousSQA_ProcessBANTAndPIExtractionResponse();
  }
}
