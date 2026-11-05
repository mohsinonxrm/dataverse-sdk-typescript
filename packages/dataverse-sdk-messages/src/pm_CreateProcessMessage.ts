import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { pm_CreateProcessResponse as pm_CreateProcessResponseData } from "./types/index.js";

/**
 * pm_CreateProcess request message
 *
 * Web API Action: pm_CreateProcess
 */
export class pm_CreateProcessRequest
  extends OrganizationRequest
  implements Executable<pm_CreateProcessResponse>
{
  constructor(
    public reportData: string,
    public inputDataBinding: string,
    public name: string,
    public description: string
  ) {
    super("pm_CreateProcess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_CreateProcess`;

    const body: Record<string, unknown> = {
      reportData: this.reportData,
      inputDataBinding: this.inputDataBinding,
      name: this.name,
      description: this.description,
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

  async parseResponse(response: Response): Promise<pm_CreateProcessResponse> {
    const data = await response.json();
    return pm_CreateProcessResponse.fromResponse(data);
  }
}

/**
 * pm_CreateProcess response message
 */
export class pm_CreateProcessResponse extends OrganizationResponse {
  constructor(public result: pm_CreateProcessResponseData) {
    super("pm_CreateProcess");
  }

  static fromResponse(data: unknown): pm_CreateProcessResponse {
    return new pm_CreateProcessResponse(responseObject<pm_CreateProcessResponseData>(data));
  }
}
