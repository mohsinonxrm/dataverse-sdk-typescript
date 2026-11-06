import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerDescriptionPublishResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerDescriptionPublish action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerDescriptionPublishResult {
  "@odata.context"?: string;
  msdyn_PublishJobId: string;
}

/**
 * msdyn_TriggerDescriptionPublish response message
 *
 * `result` is the value the msdyn_TriggerDescriptionPublish action returns (see {@link msdyn_TriggerDescriptionPublishResult}).
 */
export class msdyn_TriggerDescriptionPublishResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerDescriptionPublishResult) {
    super("msdyn_TriggerDescriptionPublish");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerDescriptionPublishResponse {
    return new msdyn_TriggerDescriptionPublishResponse(
      data as msdyn_TriggerDescriptionPublishResult
    );
  }
}
