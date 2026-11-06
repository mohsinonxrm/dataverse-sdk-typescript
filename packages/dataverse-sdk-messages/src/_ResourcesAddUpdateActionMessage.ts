import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _ResourcesAddUpdateActionResponse as _ResourcesAddUpdateActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return _ResourcesAddUpdateActionResponse.fromResponse({});
    return _ResourcesAddUpdateActionResponse.fromResponse(await response.json());
  }
}

/**
 * _ResourcesAddUpdateAction response message
 */
export class _ResourcesAddUpdateActionResponse extends OrganizationResponse {
  constructor(public result: _ResourcesAddUpdateActionResponseData) {
    super("_ResourcesAddUpdateAction");
  }

  static fromResponse(data: unknown): _ResourcesAddUpdateActionResponse {
    return new _ResourcesAddUpdateActionResponse(
      responseObject<_ResourcesAddUpdateActionResponseData>(data)
    );
  }
}
