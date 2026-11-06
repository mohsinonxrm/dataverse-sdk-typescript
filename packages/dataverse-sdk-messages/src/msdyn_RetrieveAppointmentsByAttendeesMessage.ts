import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveAppointmentsByAttendeesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveAppointmentsByAttendees action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveAppointmentsByAttendeesResult {
  "@odata.context"?: string;
  ExceptionMessage: string;
  HasChanges: boolean;
  Result: string;
}

/**
 * msdyn_RetrieveAppointmentsByAttendees response message
 *
 * `result` is the value the msdyn_RetrieveAppointmentsByAttendees action returns (see {@link msdyn_RetrieveAppointmentsByAttendeesResult}).
 */
export class msdyn_RetrieveAppointmentsByAttendeesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveAppointmentsByAttendeesResult) {
    super("msdyn_RetrieveAppointmentsByAttendees");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveAppointmentsByAttendeesResponse {
    return new msdyn_RetrieveAppointmentsByAttendeesResponse(
      data as msdyn_RetrieveAppointmentsByAttendeesResult
    );
  }
}
