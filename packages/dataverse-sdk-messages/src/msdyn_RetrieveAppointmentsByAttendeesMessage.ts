import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveAppointmentsByAttendeesResponse as msdyn_RetrieveAppointmentsByAttendeesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveAppointmentsByAttendees message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveAppointmentsByAttendeesRequestParameters {
  Version?: string;
  StartDate: string;
  EndDate: string;
  BookableResourceIds: string;
  OnlyRetrieveCompletedOrScheduled?: boolean;
  ModifiedOnDate?: string;
}

/**
 * msdyn_RetrieveAppointmentsByAttendees request message
 *
 * Web API Action: msdyn_RetrieveAppointmentsByAttendees
 */
export class msdyn_RetrieveAppointmentsByAttendeesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveAppointmentsByAttendeesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveAppointmentsByAttendeesRequestParameters>;

  constructor(parameters: msdyn_RetrieveAppointmentsByAttendeesRequestParameters) {
    super("msdyn_RetrieveAppointmentsByAttendees", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveAppointmentsByAttendees`;

    const body = requestBody({
      Version: this.Parameters.Version,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      BookableResourceIds: this.Parameters.BookableResourceIds,
      OnlyRetrieveCompletedOrScheduled: this.Parameters.OnlyRetrieveCompletedOrScheduled,
      ModifiedOnDate: this.Parameters.ModifiedOnDate,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveAppointmentsByAttendeesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveAppointmentsByAttendeesResponse.fromResponse({});
    return msdyn_RetrieveAppointmentsByAttendeesResponse.fromResponse(await response.json());
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
