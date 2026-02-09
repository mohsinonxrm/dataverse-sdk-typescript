import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetLeadCallPrepSheetDetails action
 */
export interface msdyn_GetLeadCallPrepSheetDetailsResponse {
  msdyn_label: string;
  msdyn_url: string;
}

/**
 * msdyn_GetLeadCallPrepSheetDetails action
 *
 * Unbound action
 */
export class msdyn_GetLeadCallPrepSheetDetailsAction implements Executable<msdyn_GetLeadCallPrepSheetDetailsResponse> {
  constructor(public readonly msdyn_leadid: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadCallPrepSheetDetails`;

    const body: Record<string, unknown> = {
      msdyn_leadid: this.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadCallPrepSheetDetailsResponse> {
    const data = await response.json();
    return data as msdyn_GetLeadCallPrepSheetDetailsResponse;
  }
}
