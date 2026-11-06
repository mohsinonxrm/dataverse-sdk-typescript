import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_emailAssistAdjustAPI action
 */
export interface msdyn_emailAssistAdjustAPIResponse {
  emailAssistAdjustResponse: string;
  status: string;
}

/**
 * Parameters of the msdyn_emailAssistAdjustAPI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_emailAssistAdjustAPIActionParameters {
  knobsConfigurations: string;
  emailInput: string;
  requestId: string;
  caller: string;
  copilotOption: string;
}

/**
 * msdyn_emailAssistAdjustAPI action
 *
 * Unbound action
 */
export class msdyn_emailAssistAdjustAPIAction implements Executable<msdyn_emailAssistAdjustAPIResponse> {
  constructor(public readonly parameters: msdyn_emailAssistAdjustAPIActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailAssistAdjustAPI`;

    const body = requestBody({
      knobsConfigurations: this.parameters.knobsConfigurations,
      emailInput: this.parameters.emailInput,
      requestId: this.parameters.requestId,
      caller: this.parameters.caller,
      copilotOption: this.parameters.copilotOption,
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

  async parseResponse(response: Response): Promise<msdyn_emailAssistAdjustAPIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_emailAssistAdjustAPIResponse;
    return (await response.json()) as msdyn_emailAssistAdjustAPIResponse;
  }
}
