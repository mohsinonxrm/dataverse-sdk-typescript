import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InitEntityRoutingFlow request message
 *
 * Web API Action: msdyn_InitEntityRoutingFlow
 */
export class msdyn_InitEntityRoutingFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitEntityRoutingFlowResponse>
{
  constructor(
    public liveWorkStreamId: string,
    public queueId: string,
    public entityRecordId: string,
    public entityLogicalName: string,
    public liveWorkItemTitle: string
  ) {
    super("msdyn_InitEntityRoutingFlow");
  }

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
    return new msdyn_InitEntityRoutingFlowResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LiveWorkStreamId: this.liveWorkStreamId,
      QueueId: this.queueId,
      EntityRecordId: this.entityRecordId,
      EntityLogicalName: this.entityLogicalName,
      LiveWorkItemTitle: this.liveWorkItemTitle,
    };
  }
}

/**
 * msdyn_InitEntityRoutingFlow response message
 */
export class msdyn_InitEntityRoutingFlowResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_InitEntityRoutingFlow");
  }

  static fromResponse(_data: unknown): msdyn_InitEntityRoutingFlowResponse {
    return new msdyn_InitEntityRoutingFlowResponse();
  }
}
