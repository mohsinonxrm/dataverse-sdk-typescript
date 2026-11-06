import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _SaveServiceTreeDataResponse as _SaveServiceTreeDataResponseData } from "./types/index.js";

/**
 * Parameters of the _SaveServiceTreeData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _SaveServiceTreeDataRequestParameters {
  RootNodeId: string;
  ResourceRuleList?: string;
}

/**
 * _SaveServiceTreeData request message
 *
 * Web API Action: _SaveServiceTreeData
 */
export class _SaveServiceTreeDataRequest
  extends OrganizationRequest
  implements Executable<_SaveServiceTreeDataResponse>
{
  declare readonly Parameters: Readonly<_SaveServiceTreeDataRequestParameters>;

  constructor(parameters: _SaveServiceTreeDataRequestParameters) {
    super("_SaveServiceTreeData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SaveServiceTreeData`;

    const body = requestBody({
      RootNodeId: this.Parameters.RootNodeId,
      ResourceRuleList: this.Parameters.ResourceRuleList,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return _SaveServiceTreeDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * _SaveServiceTreeData response message
 */
export class _SaveServiceTreeDataResponse extends OrganizationResponse {
  constructor(public result: _SaveServiceTreeDataResponseData) {
    super("_SaveServiceTreeData");
  }

  static fromResponse(data: unknown): _SaveServiceTreeDataResponse {
    return new _SaveServiceTreeDataResponse(responseObject<_SaveServiceTreeDataResponseData>(data));
  }
}
