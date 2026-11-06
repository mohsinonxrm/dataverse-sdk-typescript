import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_SendRecordEventUpdate request message
 *
 * Web API Action: msdyn_SendRecordEventUpdate
 */
export class msdyn_SendRecordEventUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendRecordEventUpdateResponse>
{
  constructor(
    public msdyn_EventType: string,
    public msdyn_RegardingRecord: EntityReference | AnyEntityPayload,
    public msdyn_AttributeDisplayValues?: string[],
    public msdyn_AttributeNames?: string[],
    public msdyn_RegardingActivity?: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_SendRecordEventUpdate");
  }

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
    return new msdyn_SendRecordEventUpdateResponse();
  }
}

/**
 * msdyn_SendRecordEventUpdate response message
 */
export class msdyn_SendRecordEventUpdateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SendRecordEventUpdate");
  }

  static fromResponse(_data: unknown): msdyn_SendRecordEventUpdateResponse {
    return new msdyn_SendRecordEventUpdateResponse();
  }
}
