import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InvokeServiceStoredProc message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeServiceStoredProcRequestParameters {
  ProcId: number;
  BatchSize: number;
  BatchStart: number;
}

/**
 * msdyn_InvokeServiceStoredProc request message
 *
 * Web API Action: msdyn_InvokeServiceStoredProc
 */
export class msdyn_InvokeServiceStoredProcRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeServiceStoredProcResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeServiceStoredProcRequestParameters>;

  constructor(parameters: msdyn_InvokeServiceStoredProcRequestParameters) {
    super("msdyn_InvokeServiceStoredProc", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeServiceStoredProc`;

    const body = requestBody({
      ProcId: this.Parameters.ProcId,
      BatchSize: this.Parameters.BatchSize,
      BatchStart: this.Parameters.BatchStart,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeServiceStoredProcResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeServiceStoredProcResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeServiceStoredProc action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeServiceStoredProcResult {
  "@odata.context"?: string;
  output: string;
}

/**
 * msdyn_InvokeServiceStoredProc response message
 *
 * `result` is the value the msdyn_InvokeServiceStoredProc action returns (see {@link msdyn_InvokeServiceStoredProcResult}).
 */
export class msdyn_InvokeServiceStoredProcResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeServiceStoredProcResult) {
    super("msdyn_InvokeServiceStoredProc");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeServiceStoredProcResponse {
    return new msdyn_InvokeServiceStoredProcResponse(data as msdyn_InvokeServiceStoredProcResult);
  }
}
