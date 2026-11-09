import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { PropagationOwnershipOptions, TypedQueryBase } from "./types/index.js";

/**
 * Parameters of the PropagateByExpression message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PropagateByExpressionRequestParameters {
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
 * PropagateByExpression request message
 *
 * Web API Action: PropagateByExpression
 */
export class PropagateByExpressionRequest
  extends OrganizationRequest
  implements Executable<PropagateByExpressionResponse>
{
  declare readonly Parameters: Readonly<PropagateByExpressionRequestParameters>;

  constructor(parameters: PropagateByExpressionRequestParameters) {
    super("PropagateByExpression", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PropagateByExpression`;

    const body = requestBody({
      QueryExpression: enumBody(this.Parameters.QueryExpression, "QueryBase"),
      FriendlyName: this.Parameters.FriendlyName,
      ExecuteImmediately: this.Parameters.ExecuteImmediately,
      Activity: this.Parameters.Activity,
      TemplateId: this.Parameters.TemplateId,
      OwnershipOptions: enumBody(this.Parameters.OwnershipOptions, "PropagationOwnershipOptions"),
      PostWorkflowEvent: this.Parameters.PostWorkflowEvent,
      Owner: this.Parameters.Owner,
      SendEmail: this.Parameters.SendEmail,
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

  async parseResponse(response: Response): Promise<PropagateByExpressionResponse> {
    // The body is the complex value, with its @odata.context
    return PropagateByExpressionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PropagateByExpression action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PropagateByExpressionResult {
  "@odata.context"?: string;
  BulkOperationId: string;
}

/**
 * PropagateByExpression response message
 *
 * `result` is the value the PropagateByExpression action returns (see {@link PropagateByExpressionResult}).
 */
export class PropagateByExpressionResponse extends OrganizationResponse {
  constructor(public result: PropagateByExpressionResult) {
    super("PropagateByExpression");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PropagateByExpressionResponse {
    return new PropagateByExpressionResponse(data as PropagateByExpressionResult);
  }
}
