import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrieveCustomMessagingApplicationSecretResponse as msdyn_RetrieveCustomMessagingApplicationSecretResponseData } from "./types/index.js";

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret request message
 *
 * Web API Action: msdyn_RetrieveCustomMessagingApplicationSecret
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveCustomMessagingApplicationSecretResponse>
{
  constructor(
    public msdyn_ocbotchannelregistrationId: string,
    public applicationId: string
  ) {
    super("msdyn_RetrieveCustomMessagingApplicationSecret");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocbotchannelregistrations(${this.msdyn_ocbotchannelregistrationId})/Microsoft.Dynamics.CRM.msdyn_RetrieveCustomMessagingApplicationSecret`;

    const body: Record<string, unknown> = {
      ApplicationId: this.applicationId,
    };

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
    const data = await response.json();
    return msdyn_RetrieveCustomMessagingApplicationSecretResponse.fromResponse(data);
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
