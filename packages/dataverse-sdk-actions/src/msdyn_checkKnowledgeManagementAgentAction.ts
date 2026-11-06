import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_checkKnowledgeManagementAgent action
 */
export interface msdyn_checkKnowledgeManagementAgentResponse {
  msdyn_apiResponse: string;
}

/**
 * msdyn_checkKnowledgeManagementAgent action
 *
 * Unbound action
 */
export class msdyn_checkKnowledgeManagementAgentAction implements Executable<msdyn_checkKnowledgeManagementAgentResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_checkKnowledgeManagementAgent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_checkKnowledgeManagementAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_checkKnowledgeManagementAgentResponse;
    return (await response.json()) as msdyn_checkKnowledgeManagementAgentResponse;
  }
}
