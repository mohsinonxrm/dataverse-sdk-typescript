import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonyResourceProvisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyResourceProvisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyResourceProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyResourceProvisionAction
 *
 * The first argument is the id of the msdyn_occommunicationprovidersetting record to call it on.
 */
export class msdyn_TelephonyResourceProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyResourceProvisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyResourceProvisionActionRequestParameters>;

  constructor(
    public msdyn_occommunicationprovidersettingId: string,
    parameters: msdyn_TelephonyResourceProvisionActionRequestParameters
  ) {
    super("msdyn_TelephonyResourceProvisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceProvisionAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonyResourceProvisionActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyResourceProvisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyResourceProvisionAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyResourceProvisionActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyResourceProvisionAction response message
 *
 * `result` is the value the msdyn_TelephonyResourceProvisionAction action returns (see {@link msdyn_TelephonyResourceProvisionActionResult}).
 */
export class msdyn_TelephonyResourceProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceProvisionActionResult) {
    super("msdyn_TelephonyResourceProvisionAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyResourceProvisionActionResponse {
    return new msdyn_TelephonyResourceProvisionActionResponse(
      data as msdyn_TelephonyResourceProvisionActionResult
    );
  }
}
