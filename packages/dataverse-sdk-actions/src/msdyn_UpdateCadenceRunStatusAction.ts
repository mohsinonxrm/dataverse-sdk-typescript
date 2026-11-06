import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateCadenceRunStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateCadenceRunStatusResponse = void;

/**
 * Parameters of the msdyn_UpdateCadenceRunStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateCadenceRunStatusActionParameters {
  SalesCadenceInstanceId?: string;
  StatusType?: number;
  OverallStatus?: number;
  FlowRunStatus?: string;
}

/**
 * msdyn_UpdateCadenceRunStatus action
 *
 * Unbound action
 */
export class msdyn_UpdateCadenceRunStatusAction implements Executable<msdyn_UpdateCadenceRunStatusResponse> {
  constructor(public readonly parameters: msdyn_UpdateCadenceRunStatusActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCadenceRunStatus`;

    const body = requestBody({
      SalesCadenceInstanceId: this.parameters.SalesCadenceInstanceId,
      StatusType: this.parameters.StatusType,
      OverallStatus: this.parameters.OverallStatus,
      FlowRunStatus: this.parameters.FlowRunStatus,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateCadenceRunStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
