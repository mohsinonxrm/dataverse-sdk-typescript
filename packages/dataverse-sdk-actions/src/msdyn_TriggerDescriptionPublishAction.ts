import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_TriggerDescriptionPublish action
 */
export interface msdyn_TriggerDescriptionPublishResponse {
  msdyn_PublishJobId: string;
}

/**
 * Parameters of the msdyn_TriggerDescriptionPublish action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TriggerDescriptionPublishActionParameters {
  msdyn_RunId: string;
  msdyn_FieldLogicalName: string;
  msdyn_TargetAttributeName: string;
  msdyn_EntityLogicalName: string;
}

/**
 * msdyn_TriggerDescriptionPublish action
 *
 * Unbound action
 */
export class msdyn_TriggerDescriptionPublishAction implements Executable<msdyn_TriggerDescriptionPublishResponse> {
  constructor(public readonly parameters: msdyn_TriggerDescriptionPublishActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerDescriptionPublish`;

    const body = requestBody({
      msdyn_RunId: this.parameters.msdyn_RunId,
      msdyn_FieldLogicalName: this.parameters.msdyn_FieldLogicalName,
      msdyn_TargetAttributeName: this.parameters.msdyn_TargetAttributeName,
      msdyn_EntityLogicalName: this.parameters.msdyn_EntityLogicalName,
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
    if (response.status === 204) return {} as msdyn_TriggerDescriptionPublishResponse;
    return (await response.json()) as msdyn_TriggerDescriptionPublishResponse;
  }
}
