import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
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
 * Parameters of the PropagateByExpression action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PropagateByExpressionActionParameters {
  QueryExpression?: TypedQueryBase;
  FriendlyName: string;
  ExecuteImmediately: boolean;
  Activity: EntityReference | AnyEntityPayload;
  TemplateId: string;
  OwnershipOptions: PropagationOwnershipOptions;
  PostWorkflowEvent: boolean;
  Owner: EntityReference | AnyEntityPayload;
  SendEmail: boolean;
  QueueId?: string;
  ExtendedActivityParameters?: string;
}

/**
 * PropagateByExpression action
 *
 * Unbound action
 */
export class PropagateByExpressionAction implements Executable<PropagateByExpressionResponse> {
  constructor(public readonly parameters: PropagateByExpressionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PropagateByExpression`;

    const body = requestBody({
      QueryExpression: enumBody(this.parameters.QueryExpression, "QueryBase"),
      FriendlyName: this.parameters.FriendlyName,
      ExecuteImmediately: this.parameters.ExecuteImmediately,
      Activity: this.parameters.Activity,
      TemplateId: this.parameters.TemplateId,
      OwnershipOptions: enumBody(this.parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      PostWorkflowEvent: this.parameters.PostWorkflowEvent,
      Owner: this.parameters.Owner,
      SendEmail: this.parameters.SendEmail,
      QueueId: this.parameters.QueueId,
      ExtendedActivityParameters: this.parameters.ExtendedActivityParameters,
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

  async parseResponse(response: Response): Promise<PropagateByExpressionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PropagateByExpressionResponse;
    return (await response.json()) as PropagateByExpressionResponse;
  }
}
