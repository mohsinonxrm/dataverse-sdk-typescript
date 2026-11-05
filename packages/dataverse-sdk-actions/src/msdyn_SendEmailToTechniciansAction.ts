import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SendEmailToTechnicians action
 */
export interface msdyn_SendEmailToTechniciansResponse {
  output: string;
}

/**
 * msdyn_SendEmailToTechnicians action
 *
 * Unbound action
 */
export class msdyn_SendEmailToTechniciansAction implements Executable<msdyn_SendEmailToTechniciansResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailToTechnicians`;

    const body: Record<string, unknown> = {
      input: this.input,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SendEmailToTechniciansResponse> {
    const data = await response.json();
    return data as msdyn_SendEmailToTechniciansResponse;
  }
}
