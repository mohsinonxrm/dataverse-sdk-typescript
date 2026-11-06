import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveKnowledgeManagementSettings action
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveKnowledgeManagementSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsActionParameters {
  RecordTypes?: string;
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeManagementSettingsAction implements Executable<msdyn_RetrieveKnowledgeManagementSettingsResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveKnowledgeManagementSettingsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeManagementSettings`;

    const body = requestBody({
      RecordTypes: this.parameters.RecordTypes,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveKnowledgeManagementSettingsResponse;
  }
}
