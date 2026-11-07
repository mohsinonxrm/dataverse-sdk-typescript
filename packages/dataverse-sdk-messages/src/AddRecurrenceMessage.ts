import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
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
    const url = `${baseUrl}/appointments(${odataLiteral.guid(this.appointmentId)})/Microsoft.Dynamics.CRM.AddRecurrence`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return AddRecurrenceResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return AddRecurrenceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddRecurrence action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type AddRecurrenceResult =
  | (recurringappointmentmaster & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * AddRecurrence response message
 *
 * `result` is the value the AddRecurrence action returns (see {@link AddRecurrenceResult}).
 */
export class AddRecurrenceResponse extends OrganizationResponse {
  constructor(public result: AddRecurrenceResult) {
    super("AddRecurrence");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddRecurrenceResponse {
    return new AddRecurrenceResponse((data ?? null) as AddRecurrenceResult);
  }
}
