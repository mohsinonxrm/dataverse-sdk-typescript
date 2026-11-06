import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions } from "./types/index.js";

/**
 * Response from CreateActivitiesList action
 */
export interface CreateActivitiesListResponse {
  BulkOperationId: string;
}

/**
 * Parameters of the CreateActivitiesList action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateActivitiesListActionParameters {
  ListId: string;
  FriendlyName: string;
  Activity: EntityReference | AnyEntityPayload;
  TemplateId: string;
  Propagate: boolean;
  OwnershipOptions: PropagationOwnershipOptions;
  Owner: EntityReference | AnyEntityPayload;
  sendEmail: boolean;
  PostWorkflowEvent: boolean;
  QueueId?: string;
}

/**
 * CreateActivitiesList action
 *
 * Unbound action
 */
export class CreateActivitiesListAction implements Executable<CreateActivitiesListResponse> {
  constructor(public readonly parameters: CreateActivitiesListActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateActivitiesList`;

    const body = requestBody({
      ListId: this.parameters.ListId,
      FriendlyName: this.parameters.FriendlyName,
      Activity: this.parameters.Activity,
      TemplateId: this.parameters.TemplateId,
      Propagate: this.parameters.Propagate,
      OwnershipOptions: enumBody(this.parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      Owner: this.parameters.Owner,
      sendEmail: this.parameters.sendEmail,
      PostWorkflowEvent: this.parameters.PostWorkflowEvent,
      QueueId: this.parameters.QueueId,
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

  async parseResponse(response: Response): Promise<CreateActivitiesListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateActivitiesListResponse;
    return (await response.json()) as CreateActivitiesListResponse;
  }
}
