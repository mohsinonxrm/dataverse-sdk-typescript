import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSankeyData action
 */
export interface msdyn_GetSankeyDataResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetSankeyData action
 *
 * Unbound action
 */
export class msdyn_GetSankeyDataAction implements Executable<msdyn_GetSankeyDataResponse> {
  constructor(
    public readonly msdyn_sequenceid: string,
    public readonly msdyn_dateto: string,
    public readonly msdyn_datefrom: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyData`;

    const body: Record<string, unknown> = {
      msdyn_sequenceid: this.msdyn_sequenceid,
      msdyn_dateto: this.msdyn_dateto,
      msdyn_datefrom: this.msdyn_datefrom,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyDataResponse> {
    const data = await response.json();
    return data as msdyn_GetSankeyDataResponse;
  }
}
