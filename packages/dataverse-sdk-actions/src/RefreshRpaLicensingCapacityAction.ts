import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RefreshRpaLicensingCapacity action
 */
export interface RefreshRpaLicensingCapacityResponse {
  response: string;
}

/**
 * RefreshRpaLicensingCapacity action
 *
 * Unbound action
 */
export class RefreshRpaLicensingCapacityAction implements Executable<RefreshRpaLicensingCapacityResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RefreshRpaLicensingCapacity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RefreshRpaLicensingCapacityResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RefreshRpaLicensingCapacityResponse;
  }
}
