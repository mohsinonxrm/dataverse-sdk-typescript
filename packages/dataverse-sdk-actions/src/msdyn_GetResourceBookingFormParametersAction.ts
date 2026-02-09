import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetResourceBookingFormParameters action
 */
export interface msdyn_GetResourceBookingFormParametersResponse {
  ResourceBookingFormParameters: string;
}

/**
 * msdyn_GetResourceBookingFormParameters action
 *
 * Unbound action
 */
export class msdyn_GetResourceBookingFormParametersAction implements Executable<msdyn_GetResourceBookingFormParametersResponse> {
  constructor(
    public readonly bookingContext: string,
    public readonly timeZoneCode: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetResourceBookingFormParameters`;

    const body: Record<string, unknown> = {
      BookingContext: this.bookingContext,
      TimeZoneCode: this.timeZoneCode,
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

  async parseResponse(response: Response): Promise<msdyn_GetResourceBookingFormParametersResponse> {
    const data = await response.json();
    return data as msdyn_GetResourceBookingFormParametersResponse;
  }
}
