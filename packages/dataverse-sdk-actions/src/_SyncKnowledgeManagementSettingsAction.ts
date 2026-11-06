import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the _SyncKnowledgeManagementSettings action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type _SyncKnowledgeManagementSettingsResponse = void;

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

  parseResponse(_response: Response): Promise<_SyncKnowledgeManagementSettingsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
