import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AcknowledgeNudge action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AcknowledgeNudgeResponse {
  "@odata.context"?: string;
  Message: string;
}

/**
 * Parameters of the AcknowledgeNudge action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AcknowledgeNudgeActionParameters {
  partitionid: string;
  ApiVersion: string;
}

/**
 * AcknowledgeNudge action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agentnudge)
 *
 * The first argument is the id of the msdyn_agentnudge record to call it on.
 */
export class AcknowledgeNudgeAction implements Executable<AcknowledgeNudgeResponse> {
  constructor(
    public readonly msdyn_agentnudgeId: string,
    public readonly parameters: AcknowledgeNudgeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agentnudges(${this.msdyn_agentnudgeId})/Microsoft.Dynamics.CRM.AcknowledgeNudge`;

    const body = requestBody({
      partitionid: this.parameters.partitionid,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<AcknowledgeNudgeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as AcknowledgeNudgeResponse;
  }
}
