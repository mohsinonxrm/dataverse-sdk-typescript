import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveKnowledgeManagementSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKnowledgeManagementSettingsResponse;
  }
}
