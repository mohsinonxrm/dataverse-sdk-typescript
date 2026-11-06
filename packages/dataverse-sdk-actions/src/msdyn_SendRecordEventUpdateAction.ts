import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SendRecordEventUpdate action
 */
export interface msdyn_SendRecordEventUpdateResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_SendRecordEventUpdate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendRecordEventUpdateActionParameters {
  msdyn_EventType: string;
  msdyn_RegardingRecord: EntityReference | AnyEntityPayload;
  msdyn_AttributeDisplayValues?: string[];
  msdyn_AttributeNames?: string[];
  msdyn_RegardingActivity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SendRecordEventUpdate action
 *
 * Unbound action
 */
export class msdyn_SendRecordEventUpdateAction implements Executable<msdyn_SendRecordEventUpdateResponse> {
  constructor(public readonly parameters: msdyn_SendRecordEventUpdateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendRecordEventUpdate`;

    const body = requestBody({
      msdyn_EventType: this.parameters.msdyn_EventType,
      msdyn_RegardingRecord: this.parameters.msdyn_RegardingRecord,
      msdyn_AttributeDisplayValues: this.parameters.msdyn_AttributeDisplayValues,
      msdyn_AttributeNames: this.parameters.msdyn_AttributeNames,
      msdyn_RegardingActivity: this.parameters.msdyn_RegardingActivity,
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

  async parseResponse(response: Response): Promise<msdyn_SendRecordEventUpdateResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SendRecordEventUpdateResponse;
  }
}
