import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveCustomMessagingApplicationSecretResponse as msdyn_RetrieveCustomMessagingApplicationSecretResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveCustomMessagingApplicationSecretResponse.fromResponse({});
    return msdyn_RetrieveCustomMessagingApplicationSecretResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret response message
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveCustomMessagingApplicationSecretResponseData) {
    super("msdyn_RetrieveCustomMessagingApplicationSecret");
  }

  static fromResponse(data: unknown): msdyn_RetrieveCustomMessagingApplicationSecretResponse {
    return new msdyn_RetrieveCustomMessagingApplicationSecretResponse(
      responseObject<msdyn_RetrieveCustomMessagingApplicationSecretResponseData>(data)
    );
  }
}
