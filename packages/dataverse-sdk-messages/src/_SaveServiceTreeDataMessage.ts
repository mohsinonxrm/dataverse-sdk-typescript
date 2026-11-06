import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { _SaveServiceTreeDataResponse as _SaveServiceTreeDataResponseData } from "./types/index.js";

/**
 * _SaveServiceTreeData request message
 *
 * Web API Action: _SaveServiceTreeData
 */
export class _SaveServiceTreeDataRequest
  extends OrganizationRequest
  implements Executable<_SaveServiceTreeDataResponse>
{
  constructor(
    public rootNodeId: string,
    public resourceRuleList?: string
  ) {
    super("_SaveServiceTreeData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SaveServiceTreeData`;

    const body: Record<string, unknown> = {
      RootNodeId: this.rootNodeId,
      ResourceRuleList: this.resourceRuleList,
    };

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
    const data = await response.json();
    return _SaveServiceTreeDataResponse.fromResponse(data);
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
