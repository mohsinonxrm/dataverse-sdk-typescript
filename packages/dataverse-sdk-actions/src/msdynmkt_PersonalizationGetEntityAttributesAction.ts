import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_PersonalizationGetEntityAttributes action
 */
export interface msdynmkt_PersonalizationGetEntityAttributesResponse {
  GetEntityAttributesResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityAttributesAction implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse> {
  constructor(public readonly getEntityAttributesRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityAttributes`;

    const body: Record<string, unknown> = {
      GetEntityAttributesRequest: this.getEntityAttributesRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEntityAttributesResponse> {
    const data = await response.json();
    return data as msdynmkt_PersonalizationGetEntityAttributesResponse;
  }
}
