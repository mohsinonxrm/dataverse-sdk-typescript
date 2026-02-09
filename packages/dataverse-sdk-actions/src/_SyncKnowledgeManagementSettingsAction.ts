import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _SyncKnowledgeManagementSettings action
 */
export interface _SyncKnowledgeManagementSettingsResponse {
  // No content returned
}

/**
 * _SyncKnowledgeManagementSettings action
 *
 * Unbound action
 */
export class _SyncKnowledgeManagementSettingsAction implements Executable<_SyncKnowledgeManagementSettingsResponse> {
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
    return {};
  }
}
