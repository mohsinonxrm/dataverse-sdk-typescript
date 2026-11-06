import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AsExchangeEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AsExchangeEventRequestParameters {
  msdyn_Bookings: Record<string, unknown>[];
}

/**
 * msdyn_AsExchangeEvent request message
 *
 * Web API Action: msdyn_AsExchangeEvent
 */
export class msdyn_AsExchangeEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_AsExchangeEventResponse>
{
  declare readonly Parameters: Readonly<msdyn_AsExchangeEventRequestParameters>;

  constructor(parameters: msdyn_AsExchangeEventRequestParameters) {
    super("msdyn_AsExchangeEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/bookableresourcebookings/Microsoft.Dynamics.CRM.msdyn_AsExchangeEvent`;

    const body = requestBody({
      msdyn_Bookings: this.Parameters.msdyn_Bookings,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_AsExchangeEventResponse.fromResponse(text ? JSON.parse(text) : {});
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
