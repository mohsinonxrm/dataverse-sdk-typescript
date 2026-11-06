import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_autonomousCaseCreateUpdate action
 */
export interface msdyn_autonomousCaseCreateUpdateResponse {
  autonomousCaseResponse: string;
}

/**
 * Parameters of the msdyn_autonomousCaseCreateUpdate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_autonomousCaseCreateUpdateActionParameters {
  slot__conversation?: string[];
  autonomousCaseRequest: string;
}

/**
 * msdyn_autonomousCaseCreateUpdate action
 *
 * Unbound action
 */
export class msdyn_autonomousCaseCreateUpdateAction implements Executable<msdyn_autonomousCaseCreateUpdateResponse> {
  constructor(public readonly parameters: msdyn_autonomousCaseCreateUpdateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_autonomousCaseCreateUpdate`;

    const body = requestBody({
      slot__conversation: this.parameters.slot__conversation,
      autonomousCaseRequest: this.parameters.autonomousCaseRequest,
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

  async parseResponse(response: Response): Promise<msdyn_autonomousCaseCreateUpdateResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_autonomousCaseCreateUpdateResponse;
    return (await response.json()) as msdyn_autonomousCaseCreateUpdateResponse;
  }
}
