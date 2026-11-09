import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _ResourcesAddUpdateAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ResourcesAddUpdateActionResponse {
  "@odata.context"?: string;
  CyclicResources: string;
}

/**
 * Parameters of the _ResourcesAddUpdateAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ResourcesAddUpdateActionActionParameters {
  NewlyAddedResources?: string;
  ResourceGroupId?: string;
  ResourceGroupsToAdd?: string;
}

/**
 * _ResourcesAddUpdateAction action
 *
 * Unbound action
 */
export class _ResourcesAddUpdateActionAction implements Executable<_ResourcesAddUpdateActionResponse> {
  constructor(public readonly parameters: _ResourcesAddUpdateActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesAddUpdateAction`;

    const body = requestBody({
      NewlyAddedResources: this.parameters.NewlyAddedResources,
      ResourceGroupId: this.parameters.ResourceGroupId,
      ResourceGroupsToAdd: this.parameters.ResourceGroupsToAdd,
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

  async parseResponse(response: Response): Promise<_ResourcesAddUpdateActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _ResourcesAddUpdateActionResponse;
  }
}
