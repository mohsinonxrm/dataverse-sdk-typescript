import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveOutlookSchedules request message
 *
 * Web API Action: msdyn_RetrieveOutlookSchedules
 */
export class msdyn_RetrieveOutlookSchedulesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveOutlookSchedulesResponse>
{
  constructor(
    public version: string,
    public startDate: string,
    public endDate: string,
    public bookableResourceEmails: string
  ) {
    super("msdyn_RetrieveOutlookSchedules");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOutlookSchedules`;

    const body: Record<string, unknown> = {
      Version: this.version,
      StartDate: this.startDate,
      EndDate: this.endDate,
      BookableResourceEmails: this.bookableResourceEmails,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOutlookSchedulesResponse> {
    const data = await response.json();
    return msdyn_RetrieveOutlookSchedulesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      StartDate: this.startDate,
      EndDate: this.endDate,
      BookableResourceEmails: this.bookableResourceEmails,
    };
  }
}

/**
 * msdyn_RetrieveOutlookSchedules response message
 */
export class msdyn_RetrieveOutlookSchedulesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOutlookSchedulesResponse) {
    super("msdyn_RetrieveOutlookSchedules");
  }

  static fromResponse(data: unknown): msdyn_RetrieveOutlookSchedulesResponse {
    return new msdyn_RetrieveOutlookSchedulesResponse((data as any).value);
  }
}
