import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_BulkQueueAssignmentResponse as CCaaS_BulkQueueAssignmentResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_BulkQueueAssignmentResponse.fromResponse({});
    return CCaaS_BulkQueueAssignmentResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_BulkQueueAssignment response message
 */
export class CCaaS_BulkQueueAssignmentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkQueueAssignmentResponseData) {
    super("CCaaS_BulkQueueAssignment");
  }

  static fromResponse(data: unknown): CCaaS_BulkQueueAssignmentResponse {
    return new CCaaS_BulkQueueAssignmentResponse(
      responseObject<CCaaS_BulkQueueAssignmentResponseData>(data)
    );
  }
}
