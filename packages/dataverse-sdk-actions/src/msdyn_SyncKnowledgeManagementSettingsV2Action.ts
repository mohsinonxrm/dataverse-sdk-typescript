import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SyncKnowledgeManagementSettingsV2 action
 */
export interface msdyn_SyncKnowledgeManagementSettingsV2Response {
  // No content returned
}

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SyncKnowledgeManagementSettingsV2Response> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SyncKnowledgeManagementSettingsV2Response;
  }
}
