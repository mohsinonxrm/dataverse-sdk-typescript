import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteSandboxRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteSandboxRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteSandboxRequestResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_ExecuteSandboxRequest response message
 *
 * `result` is the value the msdyn_ExecuteSandboxRequest action returns (see {@link msdyn_ExecuteSandboxRequestResult}).
 */
export class msdyn_ExecuteSandboxRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSandboxRequestResult) {
    super("msdyn_ExecuteSandboxRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteSandboxRequestResponse {
    return new msdyn_ExecuteSandboxRequestResponse(data as msdyn_ExecuteSandboxRequestResult);
  }
}
