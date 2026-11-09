import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateAuditState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateAuditStateResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateAuditStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
