import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GeneratePlatformSummary action
 */
export interface msdyn_GeneratePlatformSummaryResponse {
  Result: string;
}

/**
 * msdyn_GeneratePlatformSummary action
 *
 * Unbound action
 */
export class msdyn_GeneratePlatformSummaryAction implements Executable<msdyn_GeneratePlatformSummaryResponse> {
  constructor(
    public readonly clientContext?: string,
    public readonly otherData?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummary`;

    const body: Record<string, unknown> = {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
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

  async parseResponse(response: Response): Promise<msdyn_GeneratePlatformSummaryResponse> {
    const data = await response.json();
    return data as msdyn_GeneratePlatformSummaryResponse;
  }
}
