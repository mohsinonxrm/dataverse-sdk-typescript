import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateNBACardState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateNBACardStateResponse = void;

/**
 * Parameters of the msdyn_UpdateNBACardState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateNBACardStateActionParameters {
  msdyn_SnoozeTill?: string;
  msdyn_OperationType: number;
  msdyn_NBAEntityIds: string;
  msdyn_NBAEntityLogicalName: string;
}

/**
 * msdyn_UpdateNBACardState action
 *
 * Unbound action
 */
export class msdyn_UpdateNBACardStateAction implements Executable<msdyn_UpdateNBACardStateResponse> {
  constructor(public readonly parameters: msdyn_UpdateNBACardStateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNBACardState`;

    const body = requestBody({
      msdyn_SnoozeTill: this.parameters.msdyn_SnoozeTill,
      msdyn_OperationType: this.parameters.msdyn_OperationType,
      msdyn_NBAEntityIds: this.parameters.msdyn_NBAEntityIds,
      msdyn_NBAEntityLogicalName: this.parameters.msdyn_NBAEntityLogicalName,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateNBACardStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
