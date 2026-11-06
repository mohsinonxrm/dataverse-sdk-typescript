import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_fetchmailboxmetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchmailboxmetricsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_fetchmailboxmetricsResponse;
  }
}
