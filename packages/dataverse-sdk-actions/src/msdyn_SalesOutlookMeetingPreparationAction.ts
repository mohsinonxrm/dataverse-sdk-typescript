import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesOutlookMeetingPreparation action
 */
export interface msdyn_SalesOutlookMeetingPreparationResponse {
  msdyn_error: string;
  msdyn_result: string;
  msdyn_status: number;
}

/**
 * msdyn_SalesOutlookMeetingPreparation action
 *
 * Unbound action
 */
export class msdyn_SalesOutlookMeetingPreparationAction implements Executable<msdyn_SalesOutlookMeetingPreparationResponse> {
  constructor(
    public readonly msdyn_type: string,
    public readonly msdyn_id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOutlookMeetingPreparation`;

    const body: Record<string, unknown> = {
      msdyn_type: this.msdyn_type,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    const data = await response.json();
    return data as msdyn_SalesOutlookMeetingPreparationResponse;
  }
}
