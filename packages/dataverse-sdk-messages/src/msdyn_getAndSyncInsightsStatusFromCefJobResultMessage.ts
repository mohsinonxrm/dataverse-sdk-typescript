import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getAndSyncInsightsStatusFromCefJobResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getAndSyncInsightsStatusFromCefJobResultRequestParameters {
  msdyn_requestOptions?: string;
  msdyn_jobId: string;
  msdyn_requestId: string;
  msdyn_jobType?: string;
}

/**
 * msdyn_getAndSyncInsightsStatusFromCefJobResult request message
 *
 * Web API Action: msdyn_getAndSyncInsightsStatusFromCefJobResult
 */
export class msdyn_getAndSyncInsightsStatusFromCefJobResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_getAndSyncInsightsStatusFromCefJobResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_getAndSyncInsightsStatusFromCefJobResultRequestParameters>;

  constructor(parameters: msdyn_getAndSyncInsightsStatusFromCefJobResultRequestParameters) {
    super("msdyn_getAndSyncInsightsStatusFromCefJobResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAndSyncInsightsStatusFromCefJobResult`;

    const body = requestBody({
      msdyn_requestOptions: this.Parameters.msdyn_requestOptions,
      msdyn_jobId: this.Parameters.msdyn_jobId,
      msdyn_requestId: this.Parameters.msdyn_requestId,
      msdyn_jobType: this.Parameters.msdyn_jobType,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_getAndSyncInsightsStatusFromCefJobResultResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getAndSyncInsightsStatusFromCefJobResultResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_getAndSyncInsightsStatusFromCefJobResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getAndSyncInsightsStatusFromCefJobResultResult {
  "@odata.context"?: string;
  msdyn_responsePayload: string;
  msdyn_responseStatus: string;
}

/**
 * msdyn_getAndSyncInsightsStatusFromCefJobResult response message
 *
 * `result` is the value the msdyn_getAndSyncInsightsStatusFromCefJobResult action returns (see {@link msdyn_getAndSyncInsightsStatusFromCefJobResultResult}).
 */
export class msdyn_getAndSyncInsightsStatusFromCefJobResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_getAndSyncInsightsStatusFromCefJobResultResult) {
    super("msdyn_getAndSyncInsightsStatusFromCefJobResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getAndSyncInsightsStatusFromCefJobResultResponse {
    return new msdyn_getAndSyncInsightsStatusFromCefJobResultResponse(
      data as msdyn_getAndSyncInsightsStatusFromCefJobResultResult
    );
  }
}
