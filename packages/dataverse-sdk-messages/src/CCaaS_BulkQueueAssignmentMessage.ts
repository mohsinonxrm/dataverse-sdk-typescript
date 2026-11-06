import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_BulkQueueAssignment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BulkQueueAssignmentRequestParameters {
  ConversationIds: string[];
  TargetQueueId: string;
  ApiVersion: string;
}

/**
 * CCaaS_BulkQueueAssignment request message
 *
 * Web API Action: CCaaS_BulkQueueAssignment
 */
export class CCaaS_BulkQueueAssignmentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BulkQueueAssignmentResponse>
{
  declare readonly Parameters: Readonly<CCaaS_BulkQueueAssignmentRequestParameters>;

  constructor(parameters: CCaaS_BulkQueueAssignmentRequestParameters) {
    super("CCaaS_BulkQueueAssignment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkQueueAssignment`;

    const body = requestBody({
      ConversationIds: this.Parameters.ConversationIds,
      TargetQueueId: this.Parameters.TargetQueueId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkQueueAssignmentResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_BulkQueueAssignmentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_BulkQueueAssignment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_BulkQueueAssignmentResult {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * CCaaS_BulkQueueAssignment response message
 *
 * `result` is the value the CCaaS_BulkQueueAssignment action returns (see {@link CCaaS_BulkQueueAssignmentResult}).
 */
export class CCaaS_BulkQueueAssignmentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkQueueAssignmentResult) {
    super("CCaaS_BulkQueueAssignment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_BulkQueueAssignmentResponse {
    return new CCaaS_BulkQueueAssignmentResponse(data as CCaaS_BulkQueueAssignmentResult);
  }
}
