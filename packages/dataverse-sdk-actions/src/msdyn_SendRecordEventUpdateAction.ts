import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SendRecordEventUpdate action
 */
export interface msdyn_SendRecordEventUpdateResponse {
  // No content returned
}

/**
 * msdyn_SendRecordEventUpdate action
 *
 * Unbound action
 */
export class msdyn_SendRecordEventUpdateAction implements Executable<msdyn_SendRecordEventUpdateResponse> {
  constructor(
    public readonly msdyn_EventType: string,
    public readonly msdyn_RegardingRecord: EntityReference,
    public readonly msdyn_AttributeDisplayValues: string[],
    public readonly msdyn_AttributeNames: string[],
    public readonly msdyn_RegardingActivity: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendRecordEventUpdate`;

    const body: Record<string, unknown> = {
      msdyn_EventType: this.msdyn_EventType,
      msdyn_RegardingRecord: this.msdyn_RegardingRecord,
      msdyn_AttributeDisplayValues: this.msdyn_AttributeDisplayValues,
      msdyn_AttributeNames: this.msdyn_AttributeNames,
      msdyn_RegardingActivity: this.msdyn_RegardingActivity,
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

  async parseResponse(response: Response): Promise<msdyn_SendRecordEventUpdateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
