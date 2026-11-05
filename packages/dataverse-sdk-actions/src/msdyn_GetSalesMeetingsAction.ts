import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesMeetings action
 */
export interface msdyn_GetSalesMeetingsResponse {
  msdyn_result: string;
  msdyn_error: string;
  msdyn_status: number;
}

/**
 * msdyn_GetSalesMeetings action
 *
 * Unbound action
 */
export class msdyn_GetSalesMeetingsAction implements Executable<msdyn_GetSalesMeetingsResponse> {
  constructor(
    public readonly msdyn_from: string,
    public readonly msdyn_to: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesMeetings`;

    const body: Record<string, unknown> = {
      msdyn_from: this.msdyn_from,
      msdyn_to: this.msdyn_to,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesMeetingsResponse> {
    const data = await response.json();
    return data as msdyn_GetSalesMeetingsResponse;
  }
}
