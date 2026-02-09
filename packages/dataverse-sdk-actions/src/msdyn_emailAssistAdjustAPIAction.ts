import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_emailAssistAdjustAPI action
 */
export interface msdyn_emailAssistAdjustAPIResponse {
  emailAssistAdjustResponse: string;
  status: string;
}

/**
 * msdyn_emailAssistAdjustAPI action
 *
 * Unbound action
 */
export class msdyn_emailAssistAdjustAPIAction implements Executable<msdyn_emailAssistAdjustAPIResponse> {
  constructor(
    public readonly emailInput: string,
    public readonly caller: string,
    public readonly knobsConfigurations: string,
    public readonly requestId: string,
    public readonly copilotOption: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailAssistAdjustAPI`;

    const body: Record<string, unknown> = {
      emailInput: this.emailInput,
      caller: this.caller,
      knobsConfigurations: this.knobsConfigurations,
      requestId: this.requestId,
      copilotOption: this.copilotOption,
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

  async parseResponse(response: Response): Promise<msdyn_emailAssistAdjustAPIResponse> {
    const data = await response.json();
    return data as msdyn_emailAssistAdjustAPIResponse;
  }
}
