import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveKnowledgeManagementSettings request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeManagementSettings
 */
export class msdyn_RetrieveKnowledgeManagementSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeManagementSettingsResponse>
{
  constructor(public recordTypes: string) {
    super("msdyn_RetrieveKnowledgeManagementSettings");
  }

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
    return msdyn_RetrieveKnowledgeManagementSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RecordTypes: this.recordTypes,
    };
  }
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings response message
 */
export class msdyn_RetrieveKnowledgeManagementSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeManagementSettingsResponse) {
    super("msdyn_RetrieveKnowledgeManagementSettings");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeManagementSettingsResponse {
    return new msdyn_RetrieveKnowledgeManagementSettingsResponse((data as any).value);
  }
}
