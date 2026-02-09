import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SyncKnowledgeManagementSettingsV2 request message
 *
 * Web API Action: msdyn_SyncKnowledgeManagementSettingsV2
 */
export class msdyn_SyncKnowledgeManagementSettingsV2Request
  extends OrganizationRequest
  implements Executable<msdyn_SyncKnowledgeManagementSettingsV2Response>
{
  constructor() {
    super("msdyn_SyncKnowledgeManagementSettingsV2");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncKnowledgeManagementSettingsV2`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_SyncKnowledgeManagementSettingsV2Response> {
    // No return value (204 No Content)
    return new msdyn_SyncKnowledgeManagementSettingsV2Response();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_SyncKnowledgeManagementSettingsV2 response message
 */
export class msdyn_SyncKnowledgeManagementSettingsV2Response extends OrganizationResponse {
  constructor() {
    super("msdyn_SyncKnowledgeManagementSettingsV2");
  }

  static fromResponse(_data: unknown): msdyn_SyncKnowledgeManagementSettingsV2Response {
    return new msdyn_SyncKnowledgeManagementSettingsV2Response();
  }
}
