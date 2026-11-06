import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SendEmailToTechnicians action
 */
export interface msdyn_SendEmailToTechniciansResponse {
  output: string;
}

/**
 * Parameters of the msdyn_SendEmailToTechnicians action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendEmailToTechniciansActionParameters {
  input: string;
}

/**
 * msdyn_SendEmailToTechnicians action
 *
 * Unbound action
 */
export class msdyn_SendEmailToTechniciansAction implements Executable<msdyn_SendEmailToTechniciansResponse> {
  constructor(public readonly parameters: msdyn_SendEmailToTechniciansActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendEmailToTechnicians`;

    const body = requestBody({
      input: this.parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_SendEmailToTechniciansResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SendEmailToTechniciansResponse;
    return (await response.json()) as msdyn_SendEmailToTechniciansResponse;
  }
}
