import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_BulkForceClose action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_BulkForceCloseResponse {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * Parameters of the CCaaS_BulkForceClose action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_BulkForceCloseActionParameters {
  ConversationIds: string[];
  ApiVersion: string;
}

/**
 * CCaaS_BulkForceClose action
 *
 * Unbound action
 */
export class CCaaS_BulkForceCloseAction implements Executable<CCaaS_BulkForceCloseResponse> {
  constructor(public readonly parameters: CCaaS_BulkForceCloseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_BulkForceClose`;

    const body = requestBody({
      ConversationIds: this.parameters.ConversationIds,
      ApiVersion: this.parameters.ApiVersion,
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
    return (await response.json()) as CCaaS_BulkForceCloseResponse;
  }
}
