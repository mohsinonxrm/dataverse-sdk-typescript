import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OrphanCalendarCleanup request message
 *
 * Web API Action: msdyn_OrphanCalendarCleanup
 */
export class msdyn_OrphanCalendarCleanupRequest
  extends OrganizationRequest
  implements Executable<msdyn_OrphanCalendarCleanupResponse>
{
  constructor(public calendarId: string) {
    super("msdyn_OrphanCalendarCleanup");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OrphanCalendarCleanup`;

    const body: Record<string, unknown> = {
      CalendarId: this.calendarId,
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

  async parseResponse(response: Response): Promise<msdyn_OrphanCalendarCleanupResponse> {
    // No return value (204 No Content)
    return new msdyn_OrphanCalendarCleanupResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CalendarId: this.calendarId,
    };
  }
}

/**
 * msdyn_OrphanCalendarCleanup response message
 */
export class msdyn_OrphanCalendarCleanupResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OrphanCalendarCleanup");
  }

  static fromResponse(_data: unknown): msdyn_OrphanCalendarCleanupResponse {
    return new msdyn_OrphanCalendarCleanupResponse();
  }
}
