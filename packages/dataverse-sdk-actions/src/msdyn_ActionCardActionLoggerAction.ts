import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ActionCardActionLogger action
 */
export interface msdyn_ActionCardActionLoggerResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ActionCardActionLogger action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActionCardActionLoggerActionParameters {
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
 * msdyn_ActionCardActionLogger action
 *
 * Unbound action
 */
export class msdyn_ActionCardActionLoggerAction implements Executable<msdyn_ActionCardActionLoggerResponse> {
  constructor(public readonly parameters: msdyn_ActionCardActionLoggerActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardActionLogger`;

    const body = requestBody({
      cardType: this.parameters.cardType,
      userId: this.parameters.userId,
      cardTypeId: this.parameters.cardTypeId,
      actionType: this.parameters.actionType,
      totalActions: this.parameters.totalActions,
      actionCardId: this.parameters.actionCardId,
      regardingObjectId: this.parameters.regardingObjectId,
      regardingObjectLogicalName: this.parameters.regardingObjectLogicalName,
      regardingObjectTypeCode: this.parameters.regardingObjectTypeCode,
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

  async parseResponse(response: Response): Promise<msdyn_ActionCardActionLoggerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ActionCardActionLoggerResponse;
  }
}
