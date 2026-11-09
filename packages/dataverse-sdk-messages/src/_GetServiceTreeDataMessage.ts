import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _GetServiceTreeData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _GetServiceTreeDataRequestParameters {
  ServiceId: string;
  InputSource?: string;
}

/**
 * _GetServiceTreeData request message
 *
 * Web API Action: _GetServiceTreeData
 */
export class _GetServiceTreeDataRequest
  extends OrganizationRequest
  implements Executable<_GetServiceTreeDataResponse>
{
  declare readonly Parameters: Readonly<_GetServiceTreeDataRequestParameters>;

  constructor(parameters: _GetServiceTreeDataRequestParameters) {
    super("_GetServiceTreeData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_GetServiceTreeData`;

    const body = requestBody({
      ServiceId: this.Parameters.ServiceId,
      InputSource: this.Parameters.InputSource,
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

  async parseResponse(response: Response): Promise<_GetServiceTreeDataResponse> {
    // The body is the complex value, with its @odata.context
    return _GetServiceTreeDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _GetServiceTreeData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface _GetServiceTreeDataResult {
  "@odata.context"?: string;
  TreeObject: string;
}

/**
 * _GetServiceTreeData response message
 *
 * `result` is the value the _GetServiceTreeData action returns (see {@link _GetServiceTreeDataResult}).
 */
export class _GetServiceTreeDataResponse extends OrganizationResponse {
  constructor(public result: _GetServiceTreeDataResult) {
    super("_GetServiceTreeData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _GetServiceTreeDataResponse {
    return new _GetServiceTreeDataResponse(data as _GetServiceTreeDataResult);
  }
}
