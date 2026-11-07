import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return _SaveServiceTreeDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _SaveServiceTreeData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _SaveServiceTreeDataResult {
  "@odata.context"?: string;
  Error: string;
  UpdatedRootNode: string;
}

/**
 * _SaveServiceTreeData response message
 *
 * `result` is the value the _SaveServiceTreeData action returns (see {@link _SaveServiceTreeDataResult}).
 */
export class _SaveServiceTreeDataResponse extends OrganizationResponse {
  constructor(public result: _SaveServiceTreeDataResult) {
    super("_SaveServiceTreeData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _SaveServiceTreeDataResponse {
    return new _SaveServiceTreeDataResponse(data as _SaveServiceTreeDataResult);
  }
}
