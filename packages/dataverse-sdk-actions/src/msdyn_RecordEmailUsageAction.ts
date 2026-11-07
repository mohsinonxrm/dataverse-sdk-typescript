import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RecordEmailUsage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RecordEmailUsageResponse {
  "@odata.context"?: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_RecordEmailUsage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecordEmailUsageActionParameters {
  AdditionalParameters?: string;
  ScenarioName?: string;
  CorrelationId?: string;
}

/**
 * msdyn_RecordEmailUsage action
 *
 * Unbound action
 */
export class msdyn_RecordEmailUsageAction implements Executable<msdyn_RecordEmailUsageResponse> {
  constructor(public readonly parameters: msdyn_RecordEmailUsageActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecordEmailUsage`;

    const body = requestBody({
      AdditionalParameters: this.parameters.AdditionalParameters,
      ScenarioName: this.parameters.ScenarioName,
      CorrelationId: this.parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_RecordEmailUsageResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RecordEmailUsageResponse;
  }
}
