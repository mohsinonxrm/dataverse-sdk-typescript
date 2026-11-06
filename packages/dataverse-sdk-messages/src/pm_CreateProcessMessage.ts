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
  description?: string;
  name: string;
  inputDataBinding: string;
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
      description: this.Parameters.description,
      name: this.Parameters.name,
      inputDataBinding: this.Parameters.inputDataBinding,
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
    // 204 No Content is an empty result
    if (response.status === 204) return pm_CreateProcessResponse.fromResponse({});
    return pm_CreateProcessResponse.fromResponse(await response.json());
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
