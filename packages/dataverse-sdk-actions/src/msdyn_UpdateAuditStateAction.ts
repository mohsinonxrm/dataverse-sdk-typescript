import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdateAuditState action
 */
export interface msdyn_UpdateAuditStateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateAuditState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAuditStateActionParameters {
  msdyn_input: string;
}

/**
 * msdyn_UpdateAuditState action
 *
 * Unbound action
 */
export class msdyn_UpdateAuditStateAction implements Executable<msdyn_UpdateAuditStateResponse> {
  constructor(public readonly parameters: msdyn_UpdateAuditStateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAuditState`;

    const body = requestBody({
      msdyn_input: this.parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateAuditStateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_UpdateAuditStateResponse;
  }
}
