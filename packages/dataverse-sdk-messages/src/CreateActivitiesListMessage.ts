import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions } from "./types/index.js";

/**
 * Parameters of the CreateActivitiesList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateActivitiesListRequestParameters {
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
  ExtendedActivityParameters?: string;
}

/**
 * CreateActivitiesList request message
 *
 * Web API Action: CreateActivitiesList
 */
export class CreateActivitiesListRequest
  extends OrganizationRequest
  implements Executable<CreateActivitiesListResponse>
{
  declare readonly Parameters: Readonly<CreateActivitiesListRequestParameters>;

  constructor(parameters: CreateActivitiesListRequestParameters) {
    super("CreateActivitiesList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateActivitiesList`;

    const body = requestBody({
      ListId: this.Parameters.ListId,
      FriendlyName: this.Parameters.FriendlyName,
      Activity: this.Parameters.Activity,
      TemplateId: this.Parameters.TemplateId,
      Propagate: this.Parameters.Propagate,
      OwnershipOptions: enumBody(this.Parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      Owner: this.Parameters.Owner,
      sendEmail: this.Parameters.sendEmail,
      PostWorkflowEvent: this.Parameters.PostWorkflowEvent,
      QueueId: this.Parameters.QueueId,
      ExtendedActivityParameters: this.Parameters.ExtendedActivityParameters,
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
    // The body is the complex value, with its @odata.context
    return CreateActivitiesListResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateActivitiesList action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateActivitiesListResult {
  "@odata.context"?: string;
  BulkOperationId: string;
}

/**
 * CreateActivitiesList response message
 *
 * `result` is the value the CreateActivitiesList action returns (see {@link CreateActivitiesListResult}).
 */
export class CreateActivitiesListResponse extends OrganizationResponse {
  constructor(public result: CreateActivitiesListResult) {
    super("CreateActivitiesList");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateActivitiesListResponse {
    return new CreateActivitiesListResponse(data as CreateActivitiesListResult);
  }
}
