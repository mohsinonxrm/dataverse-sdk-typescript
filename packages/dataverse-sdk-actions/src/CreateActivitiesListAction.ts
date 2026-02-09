import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { PropagationOwnershipOptions } from "./types/index.js";

/**
 * Response from CreateActivitiesList action
 */
export interface CreateActivitiesListResponse {
  BulkOperationId: string;
}

/**
 * CreateActivitiesList action
 *
 * Unbound action
 */
export class CreateActivitiesListAction implements Executable<CreateActivitiesListResponse> {
  constructor(
    public readonly listId: string,
    public readonly friendlyName: string,
    public readonly activity: EntityReference,
    public readonly templateId: string,
    public readonly propagate: boolean,
    public readonly ownershipOptions: PropagationOwnershipOptions,
    public readonly owner: EntityReference,
    public readonly sendEmail: boolean,
    public readonly postWorkflowEvent: boolean,
    public readonly queueId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateActivitiesList`;

    const body: Record<string, unknown> = {
      ListId: this.listId,
      FriendlyName: this.friendlyName,
      Activity: this.activity,
      TemplateId: this.templateId,
      Propagate: this.propagate,
      OwnershipOptions: this.ownershipOptions,
      Owner: this.owner,
      sendEmail: this.sendEmail,
      PostWorkflowEvent: this.postWorkflowEvent,
      QueueId: this.queueId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateActivitiesListResponse> {
    const data = await response.json();
    return data as CreateActivitiesListResponse;
  }
}
