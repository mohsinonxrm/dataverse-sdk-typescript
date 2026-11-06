import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type {
  PropagateByExpressionResponse as PropagateByExpressionResponseData,
  PropagationOwnershipOptions,
  TypedQueryBase,
} from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PropagateByExpressionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PropagateByExpression response message
 */
export class PropagateByExpressionResponse extends OrganizationResponse {
  constructor(public result: PropagateByExpressionResponseData) {
    super("PropagateByExpression");
  }

  static fromResponse(data: unknown): PropagateByExpressionResponse {
    return new PropagateByExpressionResponse(
      responseObject<PropagateByExpressionResponseData>(data)
    );
  }
}
