import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_assignentity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_assignentityResponse = void;

/**
 * Parameters of the msdyn_assignentity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_assignentityActionParameters {
  RegardingEntityId: string;
  RegardingEntityName: string;
  SegmentId: string;
  CorrelationId?: string;
}

/**
 * msdyn_assignentity action
 *
 * Unbound action
 */
export class msdyn_assignentityAction implements Executable<msdyn_assignentityResponse> {
  constructor(public readonly parameters: msdyn_assignentityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentity`;

    const body = requestBody({
      RegardingEntityId: this.parameters.RegardingEntityId,
      RegardingEntityName: this.parameters.RegardingEntityName,
      SegmentId: this.parameters.SegmentId,
      CorrelationId: this.parameters.CorrelationId,
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

  parseResponse(_response: Response): Promise<msdyn_assignentityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
