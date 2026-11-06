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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<_SyncKnowledgeManagementSettingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as _SyncKnowledgeManagementSettingsResponse;
  }
}
