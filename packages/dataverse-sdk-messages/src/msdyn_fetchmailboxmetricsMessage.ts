import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_fetchmailboxmetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_fetchmailboxmetricsRequestParameters {
  filterDate?: string;
  mailboxId?: string;
}

/**
 * msdyn_fetchmailboxmetrics request message
 *
 * Web API Action: msdyn_fetchmailboxmetrics
 */
export class msdyn_fetchmailboxmetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_fetchmailboxmetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_fetchmailboxmetricsRequestParameters>;

  constructor(parameters: msdyn_fetchmailboxmetricsRequestParameters = {}) {
    super("msdyn_fetchmailboxmetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_fetchmailboxmetrics`;

    const body = requestBody({
      filterDate: this.Parameters.filterDate,
      mailboxId: this.Parameters.mailboxId,
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
    return msdyn_fetchmailboxmetricsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_fetchmailboxmetrics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_fetchmailboxmetricsResult {
  "@odata.context"?: string;
  mailboxmetricsjson: string;
}

/**
 * msdyn_fetchmailboxmetrics response message
 *
 * `result` is the value the msdyn_fetchmailboxmetrics action returns (see {@link msdyn_fetchmailboxmetricsResult}).
 */
export class msdyn_fetchmailboxmetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_fetchmailboxmetricsResult) {
    super("msdyn_fetchmailboxmetrics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_fetchmailboxmetricsResponse {
    return new msdyn_fetchmailboxmetricsResponse(data as msdyn_fetchmailboxmetricsResult);
  }
}
