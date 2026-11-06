import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RefreshRpaLicensingCapacity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RefreshRpaLicensingCapacityResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RefreshRpaLicensingCapacityResponse;
  }
}
