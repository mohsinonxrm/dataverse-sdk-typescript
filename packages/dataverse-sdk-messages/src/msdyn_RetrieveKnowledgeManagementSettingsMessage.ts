import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKnowledgeManagementSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKnowledgeManagementSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKnowledgeManagementSettingsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeManagementSettings response message
 *
 * `result` is the value the msdyn_RetrieveKnowledgeManagementSettings action returns (see {@link msdyn_RetrieveKnowledgeManagementSettingsResult}).
 */
export class msdyn_RetrieveKnowledgeManagementSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeManagementSettingsResult) {
    super("msdyn_RetrieveKnowledgeManagementSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeManagementSettingsResponse {
    return new msdyn_RetrieveKnowledgeManagementSettingsResponse(
      data as msdyn_RetrieveKnowledgeManagementSettingsResult
    );
  }
}
