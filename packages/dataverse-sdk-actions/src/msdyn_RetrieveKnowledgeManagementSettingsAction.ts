import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveKnowledgeManagementSettings action
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsResponse {
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeManagementSettingsAction implements Executable<msdyn_RetrieveKnowledgeManagementSettingsResponse> {
  constructor(public readonly recordTypes?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeManagementSettings`;

    const body: Record<string, unknown> = {
      RecordTypes: this.recordTypes,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveKnowledgeManagementSettingsResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKnowledgeManagementSettingsResponse;
  }
}
