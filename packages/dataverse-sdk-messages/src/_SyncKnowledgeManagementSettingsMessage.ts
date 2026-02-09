import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _SyncKnowledgeManagementSettings request message
 *
 * Web API Action: _SyncKnowledgeManagementSettings
 */
export class _SyncKnowledgeManagementSettingsRequest
  extends OrganizationRequest
  implements Executable<_SyncKnowledgeManagementSettingsResponse>
{
  constructor() {
    super("_SyncKnowledgeManagementSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SyncKnowledgeManagementSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<_SyncKnowledgeManagementSettingsResponse> {
    // No return value (204 No Content)
    return new _SyncKnowledgeManagementSettingsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * _SyncKnowledgeManagementSettings response message
 */
export class _SyncKnowledgeManagementSettingsResponse extends OrganizationResponse {
  constructor() {
    super("_SyncKnowledgeManagementSettings");
  }

  static fromResponse(_data: unknown): _SyncKnowledgeManagementSettingsResponse {
    return new _SyncKnowledgeManagementSettingsResponse();
  }
}
