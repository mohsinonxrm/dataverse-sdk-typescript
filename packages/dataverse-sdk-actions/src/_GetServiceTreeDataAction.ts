import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from _GetServiceTreeData action
 */
export interface _GetServiceTreeDataResponse {
  TreeObject: string;
}

/**
 * Parameters of the _GetServiceTreeData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _GetServiceTreeDataActionParameters {
  ServiceId: string;
  InputSource?: string;
}

/**
 * _GetServiceTreeData action
 *
 * Unbound action
 */
export class _GetServiceTreeDataAction implements Executable<_GetServiceTreeDataResponse> {
  constructor(public readonly parameters: _GetServiceTreeDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_GetServiceTreeData`;

    const body = requestBody({
      ServiceId: this.parameters.ServiceId,
      InputSource: this.parameters.InputSource,
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
    return (text ? JSON.parse(text) : {}) as _GetServiceTreeDataResponse;
  }
}
