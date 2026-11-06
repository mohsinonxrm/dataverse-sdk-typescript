import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetJobStatusResponse as GetJobStatusResponseData } from "./types/index.js";

/**
 * Parameters of the GetJobStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetJobStatusRequestParameters {
  istrain: boolean;
  correlationid?: string;
  aimodelid?: string;
}

/**
 * GetJobStatus request message
 *
 * Web API Action: GetJobStatus
 */
export class GetJobStatusRequest
  extends OrganizationRequest
  implements Executable<GetJobStatusResponse>
{
  declare readonly Parameters: Readonly<GetJobStatusRequestParameters>;

  constructor(parameters: GetJobStatusRequestParameters) {
    super("GetJobStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetJobStatus`;

    const body = requestBody({
      istrain: this.Parameters.istrain,
      correlationid: this.Parameters.correlationid,
      aimodelid: this.Parameters.aimodelid,
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

  async parseResponse(response: Response): Promise<GetJobStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GetJobStatusResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GetJobStatus response message
 */
export class GetJobStatusResponse extends OrganizationResponse {
  constructor(public result: GetJobStatusResponseData) {
    super("GetJobStatus");
  }

  static fromResponse(data: unknown): GetJobStatusResponse {
    return new GetJobStatusResponse(responseObject<GetJobStatusResponseData>(data));
  }
}
