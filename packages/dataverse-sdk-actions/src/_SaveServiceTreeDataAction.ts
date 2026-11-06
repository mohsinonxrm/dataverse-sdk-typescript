import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _SaveServiceTreeData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _SaveServiceTreeDataResponse {
  "@odata.context"?: string;
  Error: string;
  UpdatedRootNode: string;
}

/**
 * Parameters of the _SaveServiceTreeData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _SaveServiceTreeDataActionParameters {
  RootNodeId: string;
  ResourceRuleList?: string;
}

/**
 * _SaveServiceTreeData action
 *
 * Unbound action
 */
export class _SaveServiceTreeDataAction implements Executable<_SaveServiceTreeDataResponse> {
  constructor(public readonly parameters: _SaveServiceTreeDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SaveServiceTreeData`;

    const body = requestBody({
      RootNodeId: this.parameters.RootNodeId,
      ResourceRuleList: this.parameters.ResourceRuleList,
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

  async parseResponse(response: Response): Promise<_SaveServiceTreeDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as _SaveServiceTreeDataResponse;
  }
}
