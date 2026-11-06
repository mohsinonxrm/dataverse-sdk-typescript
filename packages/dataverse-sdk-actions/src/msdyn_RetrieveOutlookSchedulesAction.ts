import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveOutlookSchedules action
 */
export interface msdyn_RetrieveOutlookSchedulesResponse {
  Result: string;
  ExceptionMessage: string;
}

/**
 * Parameters of the msdyn_RetrieveOutlookSchedules action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOutlookSchedulesActionParameters {
  Version?: string;
  StartDate: string;
  EndDate: string;
  BookableResourceEmails: string;
}

/**
 * msdyn_RetrieveOutlookSchedules action
 *
 * Unbound action
 */
export class msdyn_RetrieveOutlookSchedulesAction implements Executable<msdyn_RetrieveOutlookSchedulesResponse> {
  constructor(public readonly parameters: msdyn_RetrieveOutlookSchedulesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOutlookSchedules`;

    const body = requestBody({
      Version: this.parameters.Version,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      BookableResourceEmails: this.parameters.BookableResourceEmails,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOutlookSchedulesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveOutlookSchedulesResponse;
    return (await response.json()) as msdyn_RetrieveOutlookSchedulesResponse;
  }
}
