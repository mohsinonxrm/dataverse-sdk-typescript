import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InitEntityRoutingFlow action
 */
export interface msdyn_InitEntityRoutingFlowResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_InitEntityRoutingFlowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InitEntityRoutingFlowResponse;
    return (await response.json()) as msdyn_InitEntityRoutingFlowResponse;
  }
}
