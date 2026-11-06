import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ShowConsumerCredentialsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ShowConsumerCredentials action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShowConsumerCredentialsResult {
  "@odata.context"?: string;
  ConsumerKeyValue: string;
  ConsumerSecretValue: string;
}

/**
 * msdyn_ShowConsumerCredentials response message
 *
 * `result` is the value the msdyn_ShowConsumerCredentials action returns (see {@link msdyn_ShowConsumerCredentialsResult}).
 */
export class msdyn_ShowConsumerCredentialsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShowConsumerCredentialsResult) {
    super("msdyn_ShowConsumerCredentials");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ShowConsumerCredentialsResponse {
    return new msdyn_ShowConsumerCredentialsResponse(data as msdyn_ShowConsumerCredentialsResult);
  }
}
