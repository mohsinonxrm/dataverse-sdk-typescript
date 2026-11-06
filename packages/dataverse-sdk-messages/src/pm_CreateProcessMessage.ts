import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { pm_CreateProcessResponse as pm_CreateProcessResponseData } from "./types/index.js";

/**
 * Parameters of the pm_CreateProcess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface pm_CreateProcessRequestParameters {
  reportData?: string;
  inputDataBinding: string;
  name: string;
  description?: string;
}

/**
 * pm_CreateProcess request message
 *
 * Web API Action: pm_CreateProcess
 */
export class pm_CreateProcessRequest
  extends OrganizationRequest
  implements Executable<pm_CreateProcessResponse>
{
  declare readonly Parameters: Readonly<pm_CreateProcessRequestParameters>;

  constructor(parameters: pm_CreateProcessRequestParameters) {
    super("pm_CreateProcess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/pm_CreateProcess`;

    const body = requestBody({
      reportData: this.Parameters.reportData,
      inputDataBinding: this.Parameters.inputDataBinding,
      name: this.Parameters.name,
      description: this.Parameters.description,
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

  async parseResponse(response: Response): Promise<pm_CreateProcessResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return pm_CreateProcessResponse.fromResponse(text ? JSON.parse(text) : {});
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
