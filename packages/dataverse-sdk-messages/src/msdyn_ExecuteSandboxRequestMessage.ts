import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteSandboxRequestResponse as msdyn_ExecuteSandboxRequestResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteSandboxRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSandboxRequestRequestParameters {
  MethodName: string;
  MethodParams?: string;
}

/**
 * msdyn_ExecuteSandboxRequest request message
 *
 * Web API Action: msdyn_ExecuteSandboxRequest
 */
export class msdyn_ExecuteSandboxRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSandboxRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteSandboxRequestRequestParameters>;

  constructor(parameters: msdyn_ExecuteSandboxRequestRequestParameters) {
    super("msdyn_ExecuteSandboxRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSandboxRequest`;

    const body = requestBody({
      MethodName: this.Parameters.MethodName,
      MethodParams: this.Parameters.MethodParams,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSandboxRequestResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ExecuteSandboxRequestResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ExecuteSandboxRequest response message
 */
export class msdyn_ExecuteSandboxRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSandboxRequestResponseData) {
    super("msdyn_ExecuteSandboxRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSandboxRequestResponse {
    return new msdyn_ExecuteSandboxRequestResponse(
      responseObject<msdyn_ExecuteSandboxRequestResponseData>(data)
    );
  }
}
