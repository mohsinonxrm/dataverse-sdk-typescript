import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ActionCardActionLogger request message
 *
 * Web API Action: msdyn_ActionCardActionLogger
 */
export class msdyn_ActionCardActionLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActionCardActionLoggerResponse>
{
  constructor(
    public cardType: number | undefined,
    public userId: string,
    public cardTypeId: string,
    public actionType: string,
    public totalActions: number,
    public actionCardId?: string,
    public regardingObjectId?: string,
    public regardingObjectLogicalName?: string,
    public regardingObjectTypeCode?: number
  ) {
    super("msdyn_ActionCardActionLogger");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardActionLogger`;

    const body: Record<string, unknown> = {
      cardType: this.cardType,
      userId: this.userId,
      cardTypeId: this.cardTypeId,
      actionType: this.actionType,
      totalActions: this.totalActions,
      actionCardId: this.actionCardId,
      regardingObjectId: this.regardingObjectId,
      regardingObjectLogicalName: this.regardingObjectLogicalName,
      regardingObjectTypeCode: this.regardingObjectTypeCode,
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

  async parseResponse(response: Response): Promise<msdyn_ActionCardActionLoggerResponse> {
    // No return value (204 No Content)
    return new msdyn_ActionCardActionLoggerResponse();
  }
}

/**
 * msdyn_ActionCardActionLogger response message
 */
export class msdyn_ActionCardActionLoggerResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ActionCardActionLogger");
  }

  static fromResponse(_data: unknown): msdyn_ActionCardActionLoggerResponse {
    return new msdyn_ActionCardActionLoggerResponse();
  }
}
