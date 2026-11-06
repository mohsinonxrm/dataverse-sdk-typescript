import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { recurringappointmentmaster } from "./types/index.js";

/**
 * Parameters of the AddRecurrence message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddRecurrenceRequestParameters {
  Target: EntityReference | EntityPayload<recurringappointmentmaster>;
}

/**
 * AddRecurrence request message
 *
 * Web API Action: AddRecurrence
 *
 * The first argument is the id of the appointment record to call it on.
 */
export class AddRecurrenceRequest
  extends OrganizationRequest
  implements Executable<AddRecurrenceResponse>
{
  declare readonly Parameters: Readonly<AddRecurrenceRequestParameters>;

  constructor(
    public appointmentId: string,
    parameters: AddRecurrenceRequestParameters
  ) {
    super("AddRecurrence", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/appointments(${this.appointmentId})/Microsoft.Dynamics.CRM.AddRecurrence`;

    const body = requestBody({
      Target: this.Parameters.Target,
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

  async parseResponse(response: Response): Promise<AddRecurrenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AddRecurrenceResponse.fromResponse({});
    return AddRecurrenceResponse.fromResponse(await response.json());
  }
}

/**
 * AddRecurrence response message
 */
export class AddRecurrenceResponse extends OrganizationResponse {
  constructor(public result: recurringappointmentmaster) {
    super("AddRecurrence");
  }

  static fromResponse(data: unknown): AddRecurrenceResponse {
    return new AddRecurrenceResponse(responseObject<recurringappointmentmaster>(data));
  }
}
