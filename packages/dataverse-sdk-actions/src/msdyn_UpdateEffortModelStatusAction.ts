import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateEffortModelStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateEffortModelStatusResponse {
  "@odata.context"?: string;
  ErrorDetail: string;
}

/**
 * Parameters of the msdyn_UpdateEffortModelStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateEffortModelStatusActionParameters {
  AiConfigId: string;
  EffortModelId: string;
}

/**
 * msdyn_UpdateEffortModelStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateEffortModelStatusAction implements Executable<msdyn_UpdateEffortModelStatusResponse> {
  constructor(public readonly parameters: msdyn_UpdateEffortModelStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body = requestBody({
      AiConfigId: this.parameters.AiConfigId,
      EffortModelId: this.parameters.EffortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateEffortModelStatusResponse;
  }
}
