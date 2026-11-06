import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveOutlookSchedulesResponse as msdyn_RetrieveOutlookSchedulesResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveOutlookSchedulesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrieveOutlookSchedules response message
 */
export class msdyn_RetrieveOutlookSchedulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOutlookSchedulesResponseData) {
    super("msdyn_RetrieveOutlookSchedules");
  }

  static fromResponse(data: unknown): msdyn_RetrieveOutlookSchedulesResponse {
    return new msdyn_RetrieveOutlookSchedulesResponse(
      responseObject<msdyn_RetrieveOutlookSchedulesResponseData>(data)
    );
  }
}
