import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_InitEntityRoutingFlow action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_InitEntityRoutingFlowResponse = void;

/**
 * Parameters of the msdyn_InitEntityRoutingFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitEntityRoutingFlowActionParameters {
  LiveWorkStreamId: string;
  QueueId?: string;
  EntityRecordId: string;
  EntityLogicalName: string;
  LiveWorkItemTitle?: string;
}

/**
 * msdyn_InitEntityRoutingFlow action
 *
 * Unbound action
 */
export class msdyn_InitEntityRoutingFlowAction implements Executable<msdyn_InitEntityRoutingFlowResponse> {
  constructor(public readonly parameters: msdyn_InitEntityRoutingFlowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRoutingFlow`;

    const body = requestBody({
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
      QueueId: this.parameters.QueueId,
      EntityRecordId: this.parameters.EntityRecordId,
      EntityLogicalName: this.parameters.EntityLogicalName,
      LiveWorkItemTitle: this.parameters.LiveWorkItemTitle,
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

  parseResponse(_response: Response): Promise<msdyn_InitEntityRoutingFlowResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
