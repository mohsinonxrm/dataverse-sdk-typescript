import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_LoadCalendars message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LoadCalendarsRequestParameters {
  LoadCalendarsInput: string;
}

/**
 * msdyn_LoadCalendars request message
 *
 * Web API Action: msdyn_LoadCalendars
 */
export class msdyn_LoadCalendarsRequest
  extends OrganizationRequest
  implements Executable<msdyn_LoadCalendarsResponse>
{
  declare readonly Parameters: Readonly<msdyn_LoadCalendarsRequestParameters>;

  constructor(parameters: msdyn_LoadCalendarsRequestParameters) {
    super("msdyn_LoadCalendars", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body = requestBody({
      LoadCalendarsInput: this.Parameters.LoadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_LoadCalendarsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_LoadCalendars action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LoadCalendarsResult {
  "@odata.context"?: string;
  CalendarEvents: string;
}

/**
 * msdyn_LoadCalendars response message
 *
 * `result` is the value the msdyn_LoadCalendars action returns (see {@link msdyn_LoadCalendarsResult}).
 */
export class msdyn_LoadCalendarsResponse extends OrganizationResponse {
  constructor(public result: msdyn_LoadCalendarsResult) {
    super("msdyn_LoadCalendars");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LoadCalendarsResponse {
    return new msdyn_LoadCalendarsResponse(data as msdyn_LoadCalendarsResult);
  }
}
