import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getAndSyncInsightsStatusFromCefJobResultResponse as msdyn_getAndSyncInsightsStatusFromCefJobResultResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_getAndSyncInsightsStatusFromCefJobResultResponse.fromResponse({});
    return msdyn_getAndSyncInsightsStatusFromCefJobResultResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_getAndSyncInsightsStatusFromCefJobResult response message
 */
export class msdyn_getAndSyncInsightsStatusFromCefJobResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_getAndSyncInsightsStatusFromCefJobResultResponseData) {
    super("msdyn_getAndSyncInsightsStatusFromCefJobResult");
  }

  static fromResponse(data: unknown): msdyn_getAndSyncInsightsStatusFromCefJobResultResponse {
    return new msdyn_getAndSyncInsightsStatusFromCefJobResultResponse(
      responseObject<msdyn_getAndSyncInsightsStatusFromCefJobResultResponseData>(data)
    );
  }
}
