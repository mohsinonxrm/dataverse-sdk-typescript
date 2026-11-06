import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveOutlookSchedules message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOutlookSchedulesRequestParameters {
  Version?: string;
  StartDate: string;
  EndDate: string;
  BookableResourceEmails: string;
}

/**
 * msdyn_RetrieveOutlookSchedules request message
 *
 * Web API Action: msdyn_RetrieveOutlookSchedules
 */
export class msdyn_RetrieveOutlookSchedulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveOutlookSchedulesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveOutlookSchedulesRequestParameters>;

  constructor(parameters: msdyn_RetrieveOutlookSchedulesRequestParameters) {
    super("msdyn_RetrieveOutlookSchedules", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOutlookSchedules`;

    const body = requestBody({
      Version: this.Parameters.Version,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      BookableResourceEmails: this.Parameters.BookableResourceEmails,
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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveOutlookSchedulesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveOutlookSchedules action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOutlookSchedulesResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
  Result: string;
}

/**
 * msdyn_RetrieveOutlookSchedules response message
 *
 * `result` is the value the msdyn_RetrieveOutlookSchedules action returns (see {@link msdyn_RetrieveOutlookSchedulesResult}).
 */
export class msdyn_RetrieveOutlookSchedulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOutlookSchedulesResult) {
    super("msdyn_RetrieveOutlookSchedules");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveOutlookSchedulesResponse {
    return new msdyn_RetrieveOutlookSchedulesResponse(data as msdyn_RetrieveOutlookSchedulesResult);
  }
}
