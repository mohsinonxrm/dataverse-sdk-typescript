import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ActionCardActionLogger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActionCardActionLoggerRequestParameters {
  cardType?: number;
  userId: string;
  cardTypeId: string;
  actionType: string;
  totalActions: number;
  actionCardId?: string;
  regardingObjectId?: string;
  regardingObjectLogicalName?: string;
  regardingObjectTypeCode?: number;
}

/**
 * msdyn_ActionCardActionLogger request message
 *
 * Web API Action: msdyn_ActionCardActionLogger
 */
export class msdyn_ActionCardActionLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActionCardActionLoggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActionCardActionLoggerRequestParameters>;

  constructor(parameters: msdyn_ActionCardActionLoggerRequestParameters) {
    super("msdyn_ActionCardActionLogger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardActionLogger`;

    const body = requestBody({
      cardType: this.Parameters.cardType,
      userId: this.Parameters.userId,
      cardTypeId: this.Parameters.cardTypeId,
      actionType: this.Parameters.actionType,
      totalActions: this.Parameters.totalActions,
      actionCardId: this.Parameters.actionCardId,
      regardingObjectId: this.Parameters.regardingObjectId,
      regardingObjectLogicalName: this.Parameters.regardingObjectLogicalName,
      regardingObjectTypeCode: this.Parameters.regardingObjectTypeCode,
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

  parseResponse(_response: Response): Promise<msdyn_ActionCardActionLoggerResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ActionCardActionLoggerResponse());
  }
}

/**
 * msdyn_ActionCardActionLogger response message
 */
export class msdyn_ActionCardActionLoggerResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ActionCardActionLogger");
  }

  static fromResponse(_data?: unknown): msdyn_ActionCardActionLoggerResponse {
    return new msdyn_ActionCardActionLoggerResponse();
  }
}
