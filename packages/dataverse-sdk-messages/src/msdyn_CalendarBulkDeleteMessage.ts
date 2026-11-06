import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CalendarBulkDelete message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CalendarBulkDeleteRequestParameters {
  CalendarIds: string;
}

/**
 * msdyn_CalendarBulkDelete request message
 *
 * Web API Action: msdyn_CalendarBulkDelete
 */
export class msdyn_CalendarBulkDeleteRequest
  extends OrganizationRequest
  implements Executable<msdyn_CalendarBulkDeleteResponse>
{
  declare readonly Parameters: Readonly<msdyn_CalendarBulkDeleteRequestParameters>;

  constructor(parameters: msdyn_CalendarBulkDeleteRequestParameters) {
    super("msdyn_CalendarBulkDelete", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalendarBulkDelete`;

    const body = requestBody({
      CalendarIds: this.Parameters.CalendarIds,
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

  parseResponse(_response: Response): Promise<msdyn_CalendarBulkDeleteResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CalendarBulkDeleteResponse());
  }
}

/**
 * msdyn_CalendarBulkDelete response message
 */
export class msdyn_CalendarBulkDeleteResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CalendarBulkDelete");
  }

  static fromResponse(_data?: unknown): msdyn_CalendarBulkDeleteResponse {
    return new msdyn_CalendarBulkDeleteResponse();
  }
}
