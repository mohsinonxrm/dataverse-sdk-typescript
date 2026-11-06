import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { _GetServiceTreeDataResponse as _GetServiceTreeDataResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return _GetServiceTreeDataResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * _GetServiceTreeData response message
 */
export class _GetServiceTreeDataResponse extends OrganizationResponse {
  constructor(public result: _GetServiceTreeDataResponseData) {
    super("_GetServiceTreeData");
  }

  static fromResponse(data: unknown): _GetServiceTreeDataResponse {
    return new _GetServiceTreeDataResponse(responseObject<_GetServiceTreeDataResponseData>(data));
  }
}
