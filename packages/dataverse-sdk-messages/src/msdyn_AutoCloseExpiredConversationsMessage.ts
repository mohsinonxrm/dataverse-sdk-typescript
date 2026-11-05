import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutoCloseExpiredConversations request message
 *
 * Web API Action: msdyn_AutoCloseExpiredConversations
 */
export class msdyn_AutoCloseExpiredConversationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoCloseExpiredConversationsResponse>
{
  constructor() {
    super("msdyn_AutoCloseExpiredConversations");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCloseExpiredConversations`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AutoCloseExpiredConversationsResponse> {
    // No return value (204 No Content)
    return new msdyn_AutoCloseExpiredConversationsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_AutoCloseExpiredConversations response message
 */
export class msdyn_AutoCloseExpiredConversationsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutoCloseExpiredConversations");
  }

  static fromResponse(_data: unknown): msdyn_AutoCloseExpiredConversationsResponse {
    return new msdyn_AutoCloseExpiredConversationsResponse();
  }
}
