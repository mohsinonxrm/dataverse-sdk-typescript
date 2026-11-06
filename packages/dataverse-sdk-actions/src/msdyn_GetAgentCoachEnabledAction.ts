import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetAgentCoachEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAgentCoachEnabledResponse {
  "@odata.context"?: string;
  msdyn_ErrorResult: string;
  msdyn_IsEnabled: string;
}

/**
 * Parameters of the msdyn_GetAgentCoachEnabled action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAgentCoachEnabledActionParameters {
  msdyn_RecordType: string;
}

/**
 * msdyn_GetAgentCoachEnabled action
 *
 * Unbound action
 */
export class msdyn_GetAgentCoachEnabledAction implements Executable<msdyn_GetAgentCoachEnabledResponse> {
  constructor(public readonly parameters: msdyn_GetAgentCoachEnabledActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAgentCoachEnabled`;

    const body = requestBody({
      msdyn_RecordType: this.parameters.msdyn_RecordType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAgentCoachEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetAgentCoachEnabledResponse;
  }
}
