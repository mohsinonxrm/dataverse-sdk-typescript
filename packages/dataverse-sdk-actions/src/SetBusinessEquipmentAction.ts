import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SetBusinessEquipment action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type SetBusinessEquipmentResponse = void;

/**
 * Parameters of the SetBusinessEquipment action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetBusinessEquipmentActionParameters {
  EquipmentId: string;
  BusinessUnitId: string;
}

/**
 * SetBusinessEquipment action
 *
 * Unbound action
 */
export class SetBusinessEquipmentAction implements Executable<SetBusinessEquipmentResponse> {
  constructor(public readonly parameters: SetBusinessEquipmentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetBusinessEquipment`;

    const body = requestBody({
      EquipmentId: this.parameters.EquipmentId,
      BusinessUnitId: this.parameters.BusinessUnitId,
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

  parseResponse(_response: Response): Promise<SetBusinessEquipmentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
