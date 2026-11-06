import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateEffortModelStatus action
 */
export interface msdyn_UpdateEffortModelStatusResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateEffortModelStatusResponse;
    return (await response.json()) as msdyn_UpdateEffortModelStatusResponse;
  }
}
