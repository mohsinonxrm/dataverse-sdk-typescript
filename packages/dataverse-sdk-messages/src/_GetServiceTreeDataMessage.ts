import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * _GetServiceTreeData request message
 *
 * Web API Action: _GetServiceTreeData
 */
export class _GetServiceTreeDataRequest
  extends OrganizationRequest
  implements Executable<_GetServiceTreeDataResponse>
{
  constructor(
    public serviceId: string,
    public inputSource: string
  ) {
    super("_GetServiceTreeData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_GetServiceTreeData`;

    const body: Record<string, unknown> = {
      ServiceId: this.serviceId,
      InputSource: this.inputSource,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<_GetServiceTreeDataResponse> {
    const data = await response.json();
    return _GetServiceTreeDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ServiceId: this.serviceId,
      InputSource: this.inputSource,
    };
  }
}

/**
 * _GetServiceTreeData response message
 */
export class _GetServiceTreeDataResponse extends OrganizationResponse {
  constructor(public result: _GetServiceTreeDataResponse) {
    super("_GetServiceTreeData");
  }

  static fromResponse(data: unknown): _GetServiceTreeDataResponse {
    return new _GetServiceTreeDataResponse((data as any).value);
  }
}
