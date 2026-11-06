import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_emailAssistAdjustAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_emailAssistAdjustAPIResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_emailAssistAdjustAPIResponse;
  }
}
