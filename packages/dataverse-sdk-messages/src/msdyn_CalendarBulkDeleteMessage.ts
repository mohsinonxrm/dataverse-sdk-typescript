import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CalendarBulkDelete request message
 *
 * Web API Action: msdyn_CalendarBulkDelete
 */
export class msdyn_CalendarBulkDeleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_CalendarBulkDeleteResponse>
{
  constructor(public calendarIds: string) {
    super("msdyn_CalendarBulkDelete");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalendarBulkDelete`;

    const body: Record<string, unknown> = {
      CalendarIds: this.calendarIds,
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

  async parseResponse(response: Response): Promise<msdyn_CalendarBulkDeleteResponse> {
    // No return value (204 No Content)
    return new msdyn_CalendarBulkDeleteResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CalendarIds: this.calendarIds,
    };
  }
}

/**
 * msdyn_CalendarBulkDelete response message
 */
export class msdyn_CalendarBulkDeleteResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CalendarBulkDelete");
  }

  static fromResponse(_data: unknown): msdyn_CalendarBulkDeleteResponse {
    return new msdyn_CalendarBulkDeleteResponse();
  }
}
