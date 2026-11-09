import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_SyncKnowledgeManagementSettingsV2 action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SyncKnowledgeManagementSettingsV2Response = void;

/**
 * msdyn_SyncKnowledgeManagementSettingsV2 action
 *
 * Unbound action
 */
export class msdyn_SyncKnowledgeManagementSettingsV2Action implements Executable<msdyn_SyncKnowledgeManagementSettingsV2Response> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncKnowledgeManagementSettingsV2`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_SyncKnowledgeManagementSettingsV2Response> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
