import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveCustomMessagingApplicationSecret message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveCustomMessagingApplicationSecretRequestParameters {
  ApplicationId: string;
}

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret request message
 *
 * Web API Action: msdyn_RetrieveCustomMessagingApplicationSecret
 *
 * The first argument is the id of the msdyn_ocbotchannelregistration record to call it on.
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveCustomMessagingApplicationSecretResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveCustomMessagingApplicationSecretRequestParameters>;

  constructor(
    public msdyn_ocbotchannelregistrationId: string,
    parameters: msdyn_RetrieveCustomMessagingApplicationSecretRequestParameters
  ) {
    super("msdyn_RetrieveCustomMessagingApplicationSecret", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocbotchannelregistrations(${this.msdyn_ocbotchannelregistrationId})/Microsoft.Dynamics.CRM.msdyn_RetrieveCustomMessagingApplicationSecret`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveCustomMessagingApplicationSecretResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveCustomMessagingApplicationSecretResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_RetrieveCustomMessagingApplicationSecret action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveCustomMessagingApplicationSecretResult {
  "@odata.context"?: string;
  CustomMessagingBCRMSAppSecret: string;
}

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret response message
 *
 * `result` is the value the msdyn_RetrieveCustomMessagingApplicationSecret action returns (see {@link msdyn_RetrieveCustomMessagingApplicationSecretResult}).
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveCustomMessagingApplicationSecretResult) {
    super("msdyn_RetrieveCustomMessagingApplicationSecret");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveCustomMessagingApplicationSecretResponse {
    return new msdyn_RetrieveCustomMessagingApplicationSecretResponse(
      data as msdyn_RetrieveCustomMessagingApplicationSecretResult
    );
  }
}
