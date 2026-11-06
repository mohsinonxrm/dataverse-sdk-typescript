import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyResourceProvisionActionResponse as msdyn_TelephonyResourceProvisionActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyResourceProvisionActionResponse.fromResponse({});
    return msdyn_TelephonyResourceProvisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyResourceProvisionAction response message
 */
export class msdyn_TelephonyResourceProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceProvisionActionResponseData) {
    super("msdyn_TelephonyResourceProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceProvisionActionResponse {
    return new msdyn_TelephonyResourceProvisionActionResponse(
      responseObject<msdyn_TelephonyResourceProvisionActionResponseData>(data)
    );
  }
}
