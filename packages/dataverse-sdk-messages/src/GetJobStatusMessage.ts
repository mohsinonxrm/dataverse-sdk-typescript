import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetJobStatus request message
 *
 * Web API Action: GetJobStatus
 */
export class GetJobStatusRequest
  extends OrganizationRequest
  implements Executable<GetJobStatusResponse>
{
  constructor(
    public istrain: boolean,
    public correlationid: string,
    public aimodelid: string
  ) {
    super("GetJobStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetJobStatus`;

    const body: Record<string, unknown> = {
      istrain: this.istrain,
      correlationid: this.correlationid,
      aimodelid: this.aimodelid,
    };

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
    const data = await response.json();
    return GetJobStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      istrain: this.istrain,
      correlationid: this.correlationid,
      aimodelid: this.aimodelid,
    };
  }
}

/**
 * GetJobStatus response message
 */
export class GetJobStatusResponse extends OrganizationResponse {
  constructor(public result: GetJobStatusResponse) {
    super("GetJobStatus");
  }

  static fromResponse(data: unknown): GetJobStatusResponse {
    return new GetJobStatusResponse((data as any).value);
  }
}
