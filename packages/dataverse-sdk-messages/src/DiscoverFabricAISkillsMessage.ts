import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DiscoverFabricAISkills message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricAISkillsRequestParameters {
  fabricEnvironment?: string;
  workspaceId: string;
}

/**
 * DiscoverFabricAISkills request message
 *
 * Web API Action: DiscoverFabricAISkills
 */
export class DiscoverFabricAISkillsRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricAISkillsResponse>
{
  declare readonly Parameters: Readonly<DiscoverFabricAISkillsRequestParameters>;

  constructor(parameters: DiscoverFabricAISkillsRequestParameters) {
    super("DiscoverFabricAISkills", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricAISkills`;

    const body = requestBody({
      fabricEnvironment: this.Parameters.fabricEnvironment,
      workspaceId: this.Parameters.workspaceId,
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

  async parseResponse(response: Response): Promise<DiscoverFabricAISkillsResponse> {
    // The body is the complex value, with its @odata.context
    return DiscoverFabricAISkillsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DiscoverFabricAISkills action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DiscoverFabricAISkillsResult {
  "@odata.context"?: string;
  fabricAISkills: string;
}

/**
 * DiscoverFabricAISkills response message
 *
 * `result` is the value the DiscoverFabricAISkills action returns (see {@link DiscoverFabricAISkillsResult}).
 */
export class DiscoverFabricAISkillsResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricAISkillsResult) {
    super("DiscoverFabricAISkills");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DiscoverFabricAISkillsResponse {
    return new DiscoverFabricAISkillsResponse(data as DiscoverFabricAISkillsResult);
  }
}
