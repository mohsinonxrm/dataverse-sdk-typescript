import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _ResourcesRemoveUpdateAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _ResourcesRemoveUpdateActionRequestParameters {
  ResourcesToBeRemoved?: string;
  ResourceGroupId?: string;
}

/**
 * _ResourcesRemoveUpdateAction request message
 *
 * Web API Action: _ResourcesRemoveUpdateAction
 */
export class _ResourcesRemoveUpdateActionRequest
  extends OrganizationRequest
  implements Executable<_ResourcesRemoveUpdateActionResponse>
{
  declare readonly Parameters: Readonly<_ResourcesRemoveUpdateActionRequestParameters>;

  constructor(parameters: _ResourcesRemoveUpdateActionRequestParameters = {}) {
    super("_ResourcesRemoveUpdateAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_ResourcesRemoveUpdateAction`;

    const body = requestBody({
      ResourcesToBeRemoved: this.Parameters.ResourcesToBeRemoved,
      ResourceGroupId: this.Parameters.ResourceGroupId,
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

  async parseResponse(response: Response): Promise<_ResourcesRemoveUpdateActionResponse> {
    // No return value (204 No Content)
    return new _ResourcesRemoveUpdateActionResponse();
  }
}

/**
 * _ResourcesRemoveUpdateAction response message
 */
export class _ResourcesRemoveUpdateActionResponse extends OrganizationResponse {
  constructor() {
    super("_ResourcesRemoveUpdateAction");
  }

  static fromResponse(_data: unknown): _ResourcesRemoveUpdateActionResponse {
    return new _ResourcesRemoveUpdateActionResponse();
  }
}
