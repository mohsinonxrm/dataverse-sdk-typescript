import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyResourceDeprovisionActionResponse as msdyn_TelephonyResourceDeprovisionActionResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TelephonyResourceDeprovisionActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_TelephonyResourceDeprovisionAction response message
 */
export class msdyn_TelephonyResourceDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceDeprovisionActionResponseData) {
    super("msdyn_TelephonyResourceDeprovisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceDeprovisionActionResponse {
    return new msdyn_TelephonyResourceDeprovisionActionResponse(
      responseObject<msdyn_TelephonyResourceDeprovisionActionResponseData>(data)
    );
  }
}
