import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InitEntityRoutingFlow message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitEntityRoutingFlowRequestParameters {
  LiveWorkStreamId: string;
  QueueId?: string;
  EntityRecordId: string;
  EntityLogicalName: string;
  LiveWorkItemTitle?: string;
}

/**
 * msdyn_InitEntityRoutingFlow request message
 *
 * Web API Action: msdyn_InitEntityRoutingFlow
 */
export class msdyn_InitEntityRoutingFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitEntityRoutingFlowResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitEntityRoutingFlowRequestParameters>;

  constructor(parameters: msdyn_InitEntityRoutingFlowRequestParameters) {
    super("msdyn_InitEntityRoutingFlow", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitEntityRoutingFlow`;

    const body = requestBody({
      LiveWorkStreamId: this.Parameters.LiveWorkStreamId,
      QueueId: this.Parameters.QueueId,
      EntityRecordId: this.Parameters.EntityRecordId,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      LiveWorkItemTitle: this.Parameters.LiveWorkItemTitle,
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
    // No return value (204 No Content)
    return new msdyn_InitEntityRoutingFlowResponse();
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
