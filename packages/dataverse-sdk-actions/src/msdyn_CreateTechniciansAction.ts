import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateTechnicians action
 */
export interface msdyn_CreateTechniciansResponse {
  output: string;
}

/**
 * msdyn_CreateTechnicians action
 *
 * Unbound action
 */
export class msdyn_CreateTechniciansAction implements Executable<msdyn_CreateTechniciansResponse> {
  constructor(public readonly input: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTechnicians`;

    const body: Record<string, unknown> = {
      input: this.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTechniciansResponse> {
    const data = await response.json();
    return data as msdyn_CreateTechniciansResponse;
  }
}
