import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_BulkForceClose message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BulkForceCloseRequestParameters {
  ConversationIds: string[];
  ApiVersion: string;
}

/**
 * CCaaS_BulkForceClose request message
 *
 * Web API Action: CCaaS_BulkForceClose
 */
export class CCaaS_BulkForceCloseRequest
  extends OrganizationRequest
  implements Executable<CCaaS_BulkForceCloseResponse>
{
  declare readonly Parameters: Readonly<CCaaS_BulkForceCloseRequestParameters>;

  constructor(parameters: CCaaS_BulkForceCloseRequestParameters) {
    super("CCaaS_BulkForceClose", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkForceClose`;

    const body = requestBody({
      ConversationIds: this.Parameters.ConversationIds,
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

  async parseResponse(response: Response): Promise<CCaaS_BulkForceCloseResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_BulkForceCloseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_BulkForceClose action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_BulkForceCloseResult {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * CCaaS_BulkForceClose response message
 *
 * `result` is the value the CCaaS_BulkForceClose action returns (see {@link CCaaS_BulkForceCloseResult}).
 */
export class CCaaS_BulkForceCloseResponse extends OrganizationResponse {
  constructor(public result: CCaaS_BulkForceCloseResult) {
    super("CCaaS_BulkForceClose");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_BulkForceCloseResponse {
    return new CCaaS_BulkForceCloseResponse(data as CCaaS_BulkForceCloseResult);
  }
}
