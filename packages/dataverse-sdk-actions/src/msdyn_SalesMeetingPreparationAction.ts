import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesMeetingPreparation action
 */
export interface msdyn_SalesMeetingPreparationResponse {
  msdyn_summary_raw: string;
  msdyn_version: string;
  msdyn_summary: string;
}

/**
 * msdyn_SalesMeetingPreparation action
 *
 * Unbound action
 */
export class msdyn_SalesMeetingPreparationAction implements Executable<msdyn_SalesMeetingPreparationResponse> {
  constructor(
    public readonly msdyn_sessionId: string | undefined,
    public readonly msdyn_activityId: string | undefined,
    public readonly msdyn_id: string,
    public readonly msdyn_responseFormat?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesMeetingPreparation`;

    const body: Record<string, unknown> = {
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_id: this.msdyn_id,
      msdyn_responseFormat: this.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_SalesMeetingPreparationResponse> {
    const data = await response.json();
    return data as msdyn_SalesMeetingPreparationResponse;
  }
}
