import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { PropagationOwnershipOptions, QueryBase } from "./types/index.js";

/**
 * PropagateByExpression request message
 *
 * Web API Action: PropagateByExpression
 */
export class PropagateByExpressionRequest
  extends OrganizationRequest
  implements Executable<PropagateByExpressionResponse>
{
  constructor(
    public queryExpression: QueryBase,
    public friendlyName: string,
    public executeImmediately: boolean,
    public activity: EntityReference,
    public templateId: string,
    public ownershipOptions: PropagationOwnershipOptions,
    public postWorkflowEvent: boolean,
    public owner: EntityReference,
    public sendEmail: boolean,
    public queueId: string
  ) {
    super("PropagateByExpression");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PropagateByExpression`;

    const body: Record<string, unknown> = {
      QueryExpression: this.queryExpression,
      FriendlyName: this.friendlyName,
      ExecuteImmediately: this.executeImmediately,
      Activity: this.activity,
      TemplateId: this.templateId,
      OwnershipOptions: this.ownershipOptions,
      PostWorkflowEvent: this.postWorkflowEvent,
      Owner: this.owner,
      SendEmail: this.sendEmail,
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

  async parseResponse(response: Response): Promise<PropagateByExpressionResponse> {
    const data = await response.json();
    return PropagateByExpressionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      QueryExpression: this.queryExpression,
      FriendlyName: this.friendlyName,
      ExecuteImmediately: this.executeImmediately,
      Activity: this.activity,
      TemplateId: this.templateId,
      OwnershipOptions: this.ownershipOptions,
      PostWorkflowEvent: this.postWorkflowEvent,
      Owner: this.owner,
      SendEmail: this.sendEmail,
      QueueId: this.queueId,
    };
  }
}

/**
 * PropagateByExpression response message
 */
export class PropagateByExpressionResponse extends OrganizationResponse {
  constructor(public result: PropagateByExpressionResponse) {
    super("PropagateByExpression");
  }

  static fromResponse(data: unknown): PropagateByExpressionResponse {
    return new PropagateByExpressionResponse((data as any).value);
  }
}
