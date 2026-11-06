import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateAccountCredentials action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateAccountCredentialsResponse = void;

/**
 * Parameters of the UpdateAccountCredentials action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateAccountCredentialsActionParameters {
  groupCredentials: string;
}

/**
 * UpdateAccountCredentials action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class UpdateAccountCredentialsAction implements Executable<UpdateAccountCredentialsResponse> {
  constructor(
    public readonly flowmachinegroupId: string,
    public readonly parameters: UpdateAccountCredentialsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.UpdateAccountCredentials`;

    const body = requestBody({
      groupCredentials: this.parameters.groupCredentials,
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

  parseResponse(_response: Response): Promise<UpdateAccountCredentialsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
