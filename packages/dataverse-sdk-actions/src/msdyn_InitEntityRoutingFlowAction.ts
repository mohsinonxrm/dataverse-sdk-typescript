import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InitEntityRoutingFlow action
 */
export interface msdyn_InitEntityRoutingFlowResponse {
  // No content returned
}

/**
 * msdyn_InitEntityRoutingFlow action
 *
 * Unbound action
 */
export class msdyn_InitEntityRoutingFlowAction implements Executable<msdyn_InitEntityRoutingFlowResponse> {
  constructor(
    public readonly liveWorkStreamId: string,
    public readonly queueId: string,
    public readonly entityRecordId: string,
    public readonly entityLogicalName: string,
    public readonly liveWorkItemTitle: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRoutingFlow`;

    const body: Record<string, unknown> = {
      LiveWorkStreamId: this.liveWorkStreamId,
      QueueId: this.queueId,
      EntityRecordId: this.entityRecordId,
      EntityLogicalName: this.entityLogicalName,
      LiveWorkItemTitle: this.liveWorkItemTitle,
    };

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
    // No return value (204 No Content)
    return {};
  }
}
