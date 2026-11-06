import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return pm_CreateProcessResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the pm_CreateProcess action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface pm_CreateProcessResult {
  "@odata.context"?: string;
  processId: string;
}

/**
 * pm_CreateProcess response message
 *
 * `result` is the value the pm_CreateProcess action returns (see {@link pm_CreateProcessResult}).
 */
export class pm_CreateProcessResponse extends OrganizationResponse {
  constructor(public result: pm_CreateProcessResult) {
    super("pm_CreateProcess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): pm_CreateProcessResponse {
    return new pm_CreateProcessResponse(data as pm_CreateProcessResult);
  }
}
