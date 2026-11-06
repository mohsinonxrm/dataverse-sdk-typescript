import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_fetchmailboxmetrics action
 */
export interface msdyn_fetchmailboxmetricsResponse {
  mailboxmetricsjson: string;
}

/**
 * Parameters of the msdyn_fetchmailboxmetrics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchmailboxmetricsActionParameters {
  filterDate?: string;
  mailboxId?: string;
}

/**
 * msdyn_fetchmailboxmetrics action
 *
 * Unbound action
 */
export class msdyn_fetchmailboxmetricsAction implements Executable<msdyn_fetchmailboxmetricsResponse> {
  constructor(public readonly parameters: msdyn_fetchmailboxmetricsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchmailboxmetrics`;

    const body = requestBody({
      filterDate: this.parameters.filterDate,
      mailboxId: this.parameters.mailboxId,
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

  async parseResponse(response: Response): Promise<msdyn_fetchmailboxmetricsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_fetchmailboxmetricsResponse;
    return (await response.json()) as msdyn_fetchmailboxmetricsResponse;
  }
}
