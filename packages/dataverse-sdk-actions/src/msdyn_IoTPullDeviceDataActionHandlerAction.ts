import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IoTPullDeviceDataActionHandler action
 */
export interface msdyn_IoTPullDeviceDataActionHandlerResponse {
  PullDeviceDataResultsJSON: string;
}

/**
 * msdyn_IoTPullDeviceDataActionHandler action
 *
 * Unbound action
 */
export class msdyn_IoTPullDeviceDataActionHandlerAction implements Executable<msdyn_IoTPullDeviceDataActionHandlerResponse> {
  constructor(public readonly entityCollection: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTPullDeviceDataActionHandler`;

    const body: Record<string, unknown> = {
      EntityCollection: this.entityCollection,
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

  async parseResponse(response: Response): Promise<msdyn_IoTPullDeviceDataActionHandlerResponse> {
    const data = await response.json();
    return data as msdyn_IoTPullDeviceDataActionHandlerResponse;
  }
}
