import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _ResourcesAddUpdateAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ResourcesAddUpdateActionRequestParameters {
  NewlyAddedResources?: string;
  ResourceGroupId?: string;
  ResourceGroupsToAdd?: string;
}

/**
 * _ResourcesAddUpdateAction request message
 *
 * Web API Action: _ResourcesAddUpdateAction
 */
export class _ResourcesAddUpdateActionRequest
  extends OrganizationRequest
  implements Executable<_ResourcesAddUpdateActionResponse>
{
  declare readonly Parameters: Readonly<_ResourcesAddUpdateActionRequestParameters>;

  constructor(parameters: _ResourcesAddUpdateActionRequestParameters = {}) {
    super("_ResourcesAddUpdateAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesAddUpdateAction`;

    const body = requestBody({
      NewlyAddedResources: this.Parameters.NewlyAddedResources,
      ResourceGroupId: this.Parameters.ResourceGroupId,
      ResourceGroupsToAdd: this.Parameters.ResourceGroupsToAdd,
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
    return _ResourcesAddUpdateActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _ResourcesAddUpdateAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _ResourcesAddUpdateActionResult {
  "@odata.context"?: string;
  CyclicResources: string;
}

/**
 * _ResourcesAddUpdateAction response message
 *
 * `result` is the value the _ResourcesAddUpdateAction action returns (see {@link _ResourcesAddUpdateActionResult}).
 */
export class _ResourcesAddUpdateActionResponse extends OrganizationResponse {
  constructor(public result: _ResourcesAddUpdateActionResult) {
    super("_ResourcesAddUpdateAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _ResourcesAddUpdateActionResponse {
    return new _ResourcesAddUpdateActionResponse(data as _ResourcesAddUpdateActionResult);
  }
}
