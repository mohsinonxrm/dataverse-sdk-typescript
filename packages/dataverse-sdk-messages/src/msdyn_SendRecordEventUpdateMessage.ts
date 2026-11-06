import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SendRecordEventUpdate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendRecordEventUpdateRequestParameters {
  msdyn_AttributeDisplayValues?: string[];
  msdyn_RegardingActivity?: EntityReference | AnyEntityPayload;
  msdyn_EventType: string;
  msdyn_AttributeNames?: string[];
  msdyn_RegardingRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SendRecordEventUpdate request message
 *
 * Web API Action: msdyn_SendRecordEventUpdate
 */
export class msdyn_SendRecordEventUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendRecordEventUpdateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendRecordEventUpdateRequestParameters>;

  constructor(parameters: msdyn_SendRecordEventUpdateRequestParameters) {
    super("msdyn_SendRecordEventUpdate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendRecordEventUpdate`;

    const body = requestBody({
      msdyn_AttributeDisplayValues: this.Parameters.msdyn_AttributeDisplayValues,
      msdyn_RegardingActivity: this.Parameters.msdyn_RegardingActivity,
      msdyn_EventType: this.Parameters.msdyn_EventType,
      msdyn_AttributeNames: this.Parameters.msdyn_AttributeNames,
      msdyn_RegardingRecord: this.Parameters.msdyn_RegardingRecord,
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
