import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_checkKnowledgeManagementAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_checkKnowledgeManagementAgentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_checkKnowledgeManagementAgentResponse;
  }
}
