import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DiscoverFabricAISkills action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DiscoverFabricAISkillsResponse {
  "@odata.context"?: string;
  fabricAISkills: string;
}

/**
 * Parameters of the DiscoverFabricAISkills action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricAISkillsActionParameters {
  fabricEnvironment?: string;
  workspaceId: string;
}

/**
 * DiscoverFabricAISkills action
 *
 * Unbound action
 */
export class DiscoverFabricAISkillsAction implements Executable<DiscoverFabricAISkillsResponse> {
  constructor(public readonly parameters: DiscoverFabricAISkillsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricAISkills`;

    const body = requestBody({
      fabricEnvironment: this.parameters.fabricEnvironment,
      workspaceId: this.parameters.workspaceId,
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
    return (await response.json()) as DiscoverFabricAISkillsResponse;
  }
}
