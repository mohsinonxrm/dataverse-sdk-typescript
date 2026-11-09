import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ManageSLAInstances action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ManageSLAInstancesResponse = void;

/**
 * Parameters of the msdyn_ManageSLAInstances action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ManageSLAInstancesActionParameters {
  SLAId: string;
  RegardingId: string;
  EntityLogicalName: string;
  Recalculate?: number;
}

/**
 * msdyn_ManageSLAInstances action
 *
 * Unbound action
 */
export class msdyn_ManageSLAInstancesAction implements Executable<msdyn_ManageSLAInstancesResponse> {
  constructor(public readonly parameters: msdyn_ManageSLAInstancesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ManageSLAInstances`;

    const body = requestBody({
      SLAId: this.parameters.SLAId,
      RegardingId: this.parameters.RegardingId,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Recalculate: this.parameters.Recalculate,
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

  parseResponse(_response: Response): Promise<msdyn_ManageSLAInstancesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
