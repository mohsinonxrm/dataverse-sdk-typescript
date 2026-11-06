import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveAppointmentsByAttendeesResponse as msdyn_RetrieveAppointmentsByAttendeesResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveAppointmentsByAttendees request message
 *
 * Web API Action: msdyn_RetrieveAppointmentsByAttendees
 */
export class msdyn_RetrieveAppointmentsByAttendeesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveAppointmentsByAttendeesResponse>
{
  constructor(
    public version: string | undefined,
    public startDate: string,
    public endDate: string,
    public bookableResourceIds: string,
    public onlyRetrieveCompletedOrScheduled?: boolean,
    public modifiedOnDate?: string
  ) {
    super("msdyn_RetrieveAppointmentsByAttendees");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveAppointmentsByAttendees`;

    const body: Record<string, unknown> = {
      Version: this.version,
      StartDate: this.startDate,
      EndDate: this.endDate,
      BookableResourceIds: this.bookableResourceIds,
      OnlyRetrieveCompletedOrScheduled: this.onlyRetrieveCompletedOrScheduled,
      ModifiedOnDate: this.modifiedOnDate,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrieveAppointmentsByAttendeesResponse> {
    const data = await response.json();
    return msdyn_RetrieveAppointmentsByAttendeesResponse.fromResponse(data);
  }
}

/**
 * msdyn_RetrieveAppointmentsByAttendees response message
 */
export class msdyn_RetrieveAppointmentsByAttendeesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveAppointmentsByAttendeesResponseData) {
    super("msdyn_RetrieveAppointmentsByAttendees");
  }

  static fromResponse(data: unknown): msdyn_RetrieveAppointmentsByAttendeesResponse {
    return new msdyn_RetrieveAppointmentsByAttendeesResponse(
      responseObject<msdyn_RetrieveAppointmentsByAttendeesResponseData>(data)
    );
  }
}
