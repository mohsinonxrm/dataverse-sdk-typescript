import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_dataprovideroperations action
 */
export interface msdyn_dataprovideroperationsResponse {
  msdyn_response: string;
}

/**
 * msdyn_dataprovideroperations action
 *
 * Unbound action
 */
export class msdyn_dataprovideroperationsAction implements Executable<msdyn_dataprovideroperationsResponse> {
  constructor(
    public readonly msdyn_recordid: string,
    public readonly msdyn_payload: string,
    public readonly msdyn_httpmethod: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_dataprovideroperations`;

    const body: Record<string, unknown> = {
      msdyn_recordid: this.msdyn_recordid,
      msdyn_payload: this.msdyn_payload,
      msdyn_httpmethod: this.msdyn_httpmethod,
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

  async parseResponse(response: Response): Promise<msdyn_dataprovideroperationsResponse> {
    const data = await response.json();
    return data as msdyn_dataprovideroperationsResponse;
  }
}
