import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PersonalizationGetEntityTypes action
 */
export interface msdynmkt_PersonalizationGetEntityTypesResponse {
  GetEntityTypesResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityTypes action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityTypesAction implements Executable<msdynmkt_PersonalizationGetEntityTypesResponse> {
  constructor(public readonly getEntityTypesRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityTypes`;

    const body: Record<string, unknown> = {
      GetEntityTypesRequest: this.getEntityTypesRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationGetEntityTypesResponse> {
    const data = await response.json();
    return data as msdynmkt_PersonalizationGetEntityTypesResponse;
  }
}
