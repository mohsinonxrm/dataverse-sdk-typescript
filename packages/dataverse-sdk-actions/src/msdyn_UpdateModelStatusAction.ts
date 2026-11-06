import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateModelStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateModelStatusResponse = void;

/**
 * Parameters of the msdyn_UpdateModelStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateModelStatusActionParameters {
  AIConfig: string;
}

/**
 * msdyn_UpdateModelStatus action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsimltraining)
 *
 * The first argument is the id of the msdyn_ocsimltraining record to call it on.
 */
export class msdyn_UpdateModelStatusAction implements Executable<msdyn_UpdateModelStatusResponse> {
  constructor(
    public readonly msdyn_ocsimltrainingId: string,
    public readonly parameters: msdyn_UpdateModelStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_UpdateModelStatus`;

    const body = requestBody({
      AIConfig: this.parameters.AIConfig,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateModelStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
