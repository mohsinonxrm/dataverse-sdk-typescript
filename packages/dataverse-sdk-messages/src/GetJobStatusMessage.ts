import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return GetJobStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetJobStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetJobStatusResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * GetJobStatus response message
 *
 * `result` is the value the GetJobStatus action returns (see {@link GetJobStatusResult}).
 */
export class GetJobStatusResponse extends OrganizationResponse {
  constructor(public result: GetJobStatusResult) {
    super("GetJobStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetJobStatusResponse {
    return new GetJobStatusResponse(data as GetJobStatusResult);
  }
}
