import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CalendarBulkDelete action
 */
export interface msdyn_CalendarBulkDeleteResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CalendarBulkDelete action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CalendarBulkDeleteActionParameters {
  CalendarIds: string;
}

/**
 * msdyn_CalendarBulkDelete action
 *
 * Unbound action
 */
export class msdyn_CalendarBulkDeleteAction implements Executable<msdyn_CalendarBulkDeleteResponse> {
  constructor(public readonly parameters: msdyn_CalendarBulkDeleteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CalendarBulkDelete`;

    const body = requestBody({
      CalendarIds: this.parameters.CalendarIds,
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

  async parseResponse(response: Response): Promise<msdyn_CalendarBulkDeleteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CalendarBulkDeleteResponse;
    return (await response.json()) as msdyn_CalendarBulkDeleteResponse;
  }
}
