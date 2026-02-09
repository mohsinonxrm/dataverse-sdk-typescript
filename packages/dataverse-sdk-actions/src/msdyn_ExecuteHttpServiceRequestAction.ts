import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteHttpServiceRequest action
 */
export interface msdyn_ExecuteHttpServiceRequestResponse {
  msdyn_StatusCode: string;
  msdyn_Response: string;
}

/**
 * msdyn_ExecuteHttpServiceRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteHttpServiceRequestAction implements Executable<msdyn_ExecuteHttpServiceRequestResponse> {
  constructor(
    public readonly msdyn_RequestType: string,
    public readonly msdyn_RequestUrl: string,
    public readonly msdyn_CloudServiceApplicationType: number,
    public readonly msdyn_RequestBody: string,
    public readonly msdyn_Method: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteHttpServiceRequest`;

    const body: Record<string, unknown> = {
      msdyn_RequestType: this.msdyn_RequestType,
      msdyn_RequestUrl: this.msdyn_RequestUrl,
      msdyn_CloudServiceApplicationType: this.msdyn_CloudServiceApplicationType,
      msdyn_RequestBody: this.msdyn_RequestBody,
      msdyn_Method: this.msdyn_Method,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteHttpServiceRequestResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteHttpServiceRequestResponse;
  }
}
