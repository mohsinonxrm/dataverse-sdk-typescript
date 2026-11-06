import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OrphanCalendarCleanup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OrphanCalendarCleanupRequestParameters {
  CalendarId: string;
}

/**
 * msdyn_OrphanCalendarCleanup request message
 *
 * Web API Action: msdyn_OrphanCalendarCleanup
 */
export class msdyn_OrphanCalendarCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_OrphanCalendarCleanupResponse>
{
  declare readonly Parameters: Readonly<msdyn_OrphanCalendarCleanupRequestParameters>;

  constructor(parameters: msdyn_OrphanCalendarCleanupRequestParameters) {
    super("msdyn_OrphanCalendarCleanup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OrphanCalendarCleanup`;

    const body = requestBody({
      CalendarId: this.Parameters.CalendarId,
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

  parseResponse(_response: Response): Promise<msdyn_OrphanCalendarCleanupResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_OrphanCalendarCleanupResponse());
  }
}

/**
 * msdyn_OrphanCalendarCleanup response message
 */
export class msdyn_OrphanCalendarCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OrphanCalendarCleanup");
  }

  static fromResponse(_data?: unknown): msdyn_OrphanCalendarCleanupResponse {
    return new msdyn_OrphanCalendarCleanupResponse();
  }
}
