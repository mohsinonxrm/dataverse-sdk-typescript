import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetJobStatus action
 */
export interface GetJobStatusResponse {
  response: string;
}

/**
 * GetJobStatus action
 *
 * Unbound action
 */
export class GetJobStatusAction implements Executable<GetJobStatusResponse> {
  constructor(
    public readonly istrain: boolean,
    public readonly correlationid: string,
    public readonly aimodelid: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetJobStatusResponse> {
    const data = await response.json();
    return data as GetJobStatusResponse;
  }
}
