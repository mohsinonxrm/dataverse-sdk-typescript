import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { solutioncomponent } from "./types/index.js";

/**
 * Response from RemoveSolutionComponent action
 */
export interface RemoveSolutionComponentResponse {
  id: string;
}

/**
 * Parameters of the RemoveSolutionComponent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveSolutionComponentActionParameters {
  SolutionComponent: EntityReference | EntityPayload<solutioncomponent>;
  ComponentType: number;
  SolutionUniqueName: string;
}

/**
 * RemoveSolutionComponent action
 *
 * Unbound action
 */
export class RemoveSolutionComponentAction implements Executable<RemoveSolutionComponentResponse> {
  constructor(public readonly parameters: RemoveSolutionComponentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveSolutionComponent`;

    const body = requestBody({
      SolutionComponent: this.parameters.SolutionComponent,
      ComponentType: this.parameters.ComponentType,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<RemoveSolutionComponentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RemoveSolutionComponentResponse;
    return (await response.json()) as RemoveSolutionComponentResponse;
  }
}
