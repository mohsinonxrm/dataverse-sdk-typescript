import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CreateActionFlow action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CreateActionFlowResponse = void;

/**
 * Parameters of the msdyn_CreateActionFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateActionFlowActionParameters {
  SLAId: string;
}

/**
 * msdyn_CreateActionFlow action
 *
 * Unbound action
 */
export class msdyn_CreateActionFlowAction implements Executable<msdyn_CreateActionFlowResponse> {
  constructor(public readonly parameters: msdyn_CreateActionFlowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateActionFlow`;

    const body = requestBody({
      SLAId: this.parameters.SLAId,
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

  parseResponse(_response: Response): Promise<msdyn_CreateActionFlowResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
