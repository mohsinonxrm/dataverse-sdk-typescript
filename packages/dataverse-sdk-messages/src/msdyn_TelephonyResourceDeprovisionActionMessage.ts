import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyResourceDeprovisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyResourceDeprovisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyResourceDeprovisionAction request message
 *
 * Web API Action: msdyn_TelephonyResourceDeprovisionAction
 *
 * The first argument is the id of the msdyn_occommunicationprovidersetting record to call it on.
 */
export class msdyn_TelephonyResourceDeprovisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyResourceDeprovisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyResourceDeprovisionActionRequestParameters>;

  constructor(
    public msdyn_occommunicationprovidersettingId: string,
    parameters: msdyn_TelephonyResourceDeprovisionActionRequestParameters
  ) {
    super("msdyn_TelephonyResourceDeprovisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceDeprovisionAction`;

    const body = requestBody({
      ActionRequest: this.Parameters.ActionRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyResourceDeprovisionActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyResourceDeprovisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyResourceDeprovisionAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyResourceDeprovisionActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyResourceDeprovisionAction response message
 *
 * `result` is the value the msdyn_TelephonyResourceDeprovisionAction action returns (see {@link msdyn_TelephonyResourceDeprovisionActionResult}).
 */
export class msdyn_TelephonyResourceDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceDeprovisionActionResult) {
    super("msdyn_TelephonyResourceDeprovisionAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyResourceDeprovisionActionResponse {
    return new msdyn_TelephonyResourceDeprovisionActionResponse(
      data as msdyn_TelephonyResourceDeprovisionActionResult
    );
  }
}
