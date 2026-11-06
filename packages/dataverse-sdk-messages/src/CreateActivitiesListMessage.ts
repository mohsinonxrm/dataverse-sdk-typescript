import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type {
  CreateActivitiesListResponse as CreateActivitiesListResponseData,
  PropagationOwnershipOptions,
} from "./types/index.js";

/**
 * CreateActivitiesList request message
 *
 * Web API Action: CreateActivitiesList
 */
export class CreateActivitiesListRequest
  extends OrganizationRequest
  implements Executable<CreateActivitiesListResponse>
{
  constructor(
    public listId: string,
    public friendlyName: string,
    public activity: EntityReference | AnyEntityPayload,
    public templateId: string,
    public propagate: boolean,
    public ownershipOptions: PropagationOwnershipOptions,
    public owner: EntityReference | AnyEntityPayload,
    public sendEmail: boolean,
    public postWorkflowEvent: boolean,
    public queueId?: string
  ) {
    super("CreateActivitiesList");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateActivitiesListResponse> {
    const data = await response.json();
    return CreateActivitiesListResponse.fromResponse(data);
  }
}

/**
 * CreateActivitiesList response message
 */
export class CreateActivitiesListResponse extends OrganizationResponse {
  constructor(public result: CreateActivitiesListResponseData) {
    super("CreateActivitiesList");
  }

  static fromResponse(data: unknown): CreateActivitiesListResponse {
    return new CreateActivitiesListResponse(responseObject<CreateActivitiesListResponseData>(data));
  }
}
