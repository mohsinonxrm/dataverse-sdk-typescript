import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetResourceBookingFormParameters request message
 *
 * Web API Action: msdyn_GetResourceBookingFormParameters
 */
export class msdyn_GetResourceBookingFormParametersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetResourceBookingFormParametersResponse>
{
  constructor(
    public bookingContext: string,
    public timeZoneCode: number
  ) {
    super("msdyn_GetResourceBookingFormParameters");
  }

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
    return msdyn_GetResourceBookingFormParametersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      BookingContext: this.bookingContext,
      TimeZoneCode: this.timeZoneCode,
    };
  }
}

/**
 * msdyn_GetResourceBookingFormParameters response message
 */
export class msdyn_GetResourceBookingFormParametersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetResourceBookingFormParametersResponse) {
    super("msdyn_GetResourceBookingFormParameters");
  }

  static fromResponse(data: unknown): msdyn_GetResourceBookingFormParametersResponse {
    return new msdyn_GetResourceBookingFormParametersResponse((data as any).value);
  }
}
