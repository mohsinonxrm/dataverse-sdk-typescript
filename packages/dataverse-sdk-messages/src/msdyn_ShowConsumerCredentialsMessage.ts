import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ShowConsumerCredentialsResponse as msdyn_ShowConsumerCredentialsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ShowConsumerCredentials message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShowConsumerCredentialsRequestParameters {
  ApplicationId: string;
}

/**
 * msdyn_ShowConsumerCredentials request message
 *
 * Web API Action: msdyn_ShowConsumerCredentials
 *
 * The first argument is the id of the msdyn_octwitterapplication record to call it on.
 */
export class msdyn_ShowConsumerCredentialsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShowConsumerCredentialsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ShowConsumerCredentialsRequestParameters>;

  constructor(
    public msdyn_octwitterapplicationId: string,
    parameters: msdyn_ShowConsumerCredentialsRequestParameters
  ) {
    super("msdyn_ShowConsumerCredentials", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_octwitterapplications(${this.msdyn_octwitterapplicationId})/Microsoft.Dynamics.CRM.msdyn_ShowConsumerCredentials`;

    const body = requestBody({
      ApplicationId: this.Parameters.ApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_ShowConsumerCredentialsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ShowConsumerCredentialsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ShowConsumerCredentials response message
 */
export class msdyn_ShowConsumerCredentialsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShowConsumerCredentialsResponseData) {
    super("msdyn_ShowConsumerCredentials");
  }

  static fromResponse(data: unknown): msdyn_ShowConsumerCredentialsResponse {
    return new msdyn_ShowConsumerCredentialsResponse(
      responseObject<msdyn_ShowConsumerCredentialsResponseData>(data)
    );
  }
}
