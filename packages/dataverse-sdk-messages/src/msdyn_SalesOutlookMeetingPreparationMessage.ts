import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesOutlookMeetingPreparation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOutlookMeetingPreparationRequestParameters {
  msdyn_type: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesOutlookMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesOutlookMeetingPreparation
 */
export class msdyn_SalesOutlookMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOutlookMeetingPreparationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesOutlookMeetingPreparationRequestParameters>;

  constructor(parameters: msdyn_SalesOutlookMeetingPreparationRequestParameters) {
    super("msdyn_SalesOutlookMeetingPreparation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOutlookMeetingPreparation`;

    const body = requestBody({
      msdyn_type: this.Parameters.msdyn_type,
      msdyn_id: this.Parameters.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesOutlookMeetingPreparationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesOutlookMeetingPreparation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesOutlookMeetingPreparationResult {
  "@odata.context"?: string;
  msdyn_error: string;
  msdyn_result: string;
  msdyn_status: number;
}

/**
 * msdyn_SalesOutlookMeetingPreparation response message
 *
 * `result` is the value the msdyn_SalesOutlookMeetingPreparation action returns (see {@link msdyn_SalesOutlookMeetingPreparationResult}).
 */
export class msdyn_SalesOutlookMeetingPreparationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOutlookMeetingPreparationResult) {
    super("msdyn_SalesOutlookMeetingPreparation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesOutlookMeetingPreparationResponse {
    return new msdyn_SalesOutlookMeetingPreparationResponse(
      data as msdyn_SalesOutlookMeetingPreparationResult
    );
  }
}
