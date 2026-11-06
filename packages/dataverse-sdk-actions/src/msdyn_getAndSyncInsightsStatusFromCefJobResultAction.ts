import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_getAndSyncInsightsStatusFromCefJobResult action
 */
export interface msdyn_getAndSyncInsightsStatusFromCefJobResultResponse {
  msdyn_responsePayload: string;
  msdyn_responseStatus: string;
}

/**
 * Parameters of the msdyn_getAndSyncInsightsStatusFromCefJobResult action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getAndSyncInsightsStatusFromCefJobResultActionParameters {
  msdyn_requestOptions?: string;
  msdyn_jobId: string;
  msdyn_requestId: string;
  msdyn_jobType?: string;
}

/**
 * msdyn_getAndSyncInsightsStatusFromCefJobResult action
 *
 * Unbound action
 */
export class msdyn_getAndSyncInsightsStatusFromCefJobResultAction implements Executable<msdyn_getAndSyncInsightsStatusFromCefJobResultResponse> {
  constructor(
    public readonly parameters: msdyn_getAndSyncInsightsStatusFromCefJobResultActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getAndSyncInsightsStatusFromCefJobResult`;

    const body = requestBody({
      msdyn_requestOptions: this.parameters.msdyn_requestOptions,
      msdyn_jobId: this.parameters.msdyn_jobId,
      msdyn_requestId: this.parameters.msdyn_requestId,
      msdyn_jobType: this.parameters.msdyn_jobType,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_getAndSyncInsightsStatusFromCefJobResultResponse;
    return (await response.json()) as msdyn_getAndSyncInsightsStatusFromCefJobResultResponse;
  }
}
