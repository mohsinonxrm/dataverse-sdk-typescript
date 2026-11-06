import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions, TypedQueryBase } from "./types/index.js";

/**
 * Response from PropagateByExpression action
 */
export interface PropagateByExpressionResponse {
  BulkOperationId: string;
}

/**
 * PropagateByExpression action
 *
 * Unbound action
 */
export class PropagateByExpressionAction implements Executable<PropagateByExpressionResponse> {
  constructor(
    public readonly queryExpression: TypedQueryBase | undefined,
    public readonly friendlyName: string,
    public readonly executeImmediately: boolean,
    public readonly activity: EntityReference | AnyEntityPayload,
    public readonly templateId: string,
    public readonly ownershipOptions: PropagationOwnershipOptions,
    public readonly postWorkflowEvent: boolean,
    public readonly owner: EntityReference | AnyEntityPayload,
    public readonly sendEmail: boolean,
    public readonly queueId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PropagateByExpression`;

    const body: Record<string, unknown> = {
      QueryExpression: enumBody(this.queryExpression, "QueryBase"),
      FriendlyName: this.friendlyName,
      ExecuteImmediately: this.executeImmediately,
      Activity: this.activity,
      TemplateId: this.templateId,
      OwnershipOptions: enumBody(this.ownershipOptions, "PropagationOwnershipOptions"),
      PostWorkflowEvent: this.postWorkflowEvent,
      Owner: this.owner,
      SendEmail: this.sendEmail,
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

  async parseResponse(response: Response): Promise<PropagateByExpressionResponse> {
    const data = await response.json();
    return data as PropagateByExpressionResponse;
  }
}
