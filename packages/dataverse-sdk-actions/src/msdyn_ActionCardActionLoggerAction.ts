import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ActionCardActionLogger action
 */
export interface msdyn_ActionCardActionLoggerResponse {
  // No content returned
}

/**
 * msdyn_ActionCardActionLogger action
 *
 * Unbound action
 */
export class msdyn_ActionCardActionLoggerAction implements Executable<msdyn_ActionCardActionLoggerResponse> {
  constructor(
    public readonly cardType: number,
    public readonly userId: string,
    public readonly cardTypeId: string,
    public readonly actionType: string,
    public readonly totalActions: number,
    public readonly actionCardId: string,
    public readonly regardingObjectId: string,
    public readonly regardingObjectLogicalName: string,
    public readonly regardingObjectTypeCode: number
  ) {}

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
    return {};
  }
}
