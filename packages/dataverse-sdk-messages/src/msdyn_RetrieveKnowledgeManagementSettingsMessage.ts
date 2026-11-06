import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveKnowledgeManagementSettingsResponse as msdyn_RetrieveKnowledgeManagementSettingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveKnowledgeManagementSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsRequestParameters {
  RecordTypes?: string;
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeManagementSettings
 */
export class msdyn_RetrieveKnowledgeManagementSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeManagementSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKnowledgeManagementSettingsRequestParameters>;

  constructor(parameters: msdyn_RetrieveKnowledgeManagementSettingsRequestParameters = {}) {
    super("msdyn_RetrieveKnowledgeManagementSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeManagementSettings`;

    const body = requestBody({
      RecordTypes: this.Parameters.RecordTypes,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveKnowledgeManagementSettingsResponse.fromResponse({});
    return msdyn_RetrieveKnowledgeManagementSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings response message
 */
export class msdyn_RetrieveKnowledgeManagementSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeManagementSettingsResponseData) {
    super("msdyn_RetrieveKnowledgeManagementSettings");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeManagementSettingsResponse {
    return new msdyn_RetrieveKnowledgeManagementSettingsResponse(
      responseObject<msdyn_RetrieveKnowledgeManagementSettingsResponseData>(data)
    );
  }
}
