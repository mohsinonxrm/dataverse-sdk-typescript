import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteSISampleDataRequest action
 */
export interface msdyn_ExecuteSISampleDataRequestResponse {
  Response: string;
}

/**
 * msdyn_ExecuteSISampleDataRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSISampleDataRequestAction implements Executable<msdyn_ExecuteSISampleDataRequestResponse> {
  constructor(
    public readonly operation: string,
    public readonly version: string,
    public readonly lcid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSISampleDataRequest`;

    const body: Record<string, unknown> = {
      Operation: this.operation,
      Version: this.version,
      Lcid: this.lcid,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSISampleDataRequestResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteSISampleDataRequestResponse;
  }
}
