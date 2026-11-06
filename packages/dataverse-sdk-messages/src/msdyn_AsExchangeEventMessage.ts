import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_AsExchangeEvent request message
 *
 * Web API Action: msdyn_AsExchangeEvent
 */
export class msdyn_AsExchangeEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_AsExchangeEventResponse>
{
  constructor(public msdyn_Bookings: Record<string, unknown>[]) {
    super("msdyn_AsExchangeEvent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/bookableresourcebookings/Microsoft.Dynamics.CRM.msdyn_AsExchangeEvent`;

    const body: Record<string, unknown> = {
      msdyn_Bookings: this.msdyn_Bookings,
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

  async parseResponse(response: Response): Promise<msdyn_AsExchangeEventResponse> {
    const data = await response.json();
    return msdyn_AsExchangeEventResponse.fromResponse(data);
  }
}

/**
 * msdyn_AsExchangeEvent response message
 */
export class msdyn_AsExchangeEventResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_AsExchangeEvent");
  }

  static fromResponse(data: unknown): msdyn_AsExchangeEventResponse {
    return new msdyn_AsExchangeEventResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
