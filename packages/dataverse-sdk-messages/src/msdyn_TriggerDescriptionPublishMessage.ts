import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TriggerDescriptionPublishResponse as msdyn_TriggerDescriptionPublishResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TriggerDescriptionPublish message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerDescriptionPublishRequestParameters {
  msdyn_RunId: string;
  msdyn_FieldLogicalName: string;
  msdyn_TargetAttributeName: string;
  msdyn_EntityLogicalName: string;
}

/**
 * msdyn_TriggerDescriptionPublish request message
 *
 * Web API Action: msdyn_TriggerDescriptionPublish
 */
export class msdyn_TriggerDescriptionPublishRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerDescriptionPublishResponse>
{
  declare readonly Parameters: Readonly<msdyn_TriggerDescriptionPublishRequestParameters>;

  constructor(parameters: msdyn_TriggerDescriptionPublishRequestParameters) {
    super("msdyn_TriggerDescriptionPublish", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerDescriptionPublish`;

    const body = requestBody({
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_FieldLogicalName: this.Parameters.msdyn_FieldLogicalName,
      msdyn_TargetAttributeName: this.Parameters.msdyn_TargetAttributeName,
      msdyn_EntityLogicalName: this.Parameters.msdyn_EntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_TriggerDescriptionPublishResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_TriggerDescriptionPublishResponse.fromResponse({});
    return msdyn_TriggerDescriptionPublishResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TriggerDescriptionPublish response message
 */
export class msdyn_TriggerDescriptionPublishResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerDescriptionPublishResponseData) {
    super("msdyn_TriggerDescriptionPublish");
  }

  static fromResponse(data: unknown): msdyn_TriggerDescriptionPublishResponse {
    return new msdyn_TriggerDescriptionPublishResponse(
      responseObject<msdyn_TriggerDescriptionPublishResponseData>(data)
    );
  }
}
