import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ShowConsumerCredentialsResponse as msdyn_ShowConsumerCredentialsResponseData } from "./types/index.js";

/**
 * msdyn_ShowConsumerCredentials request message
 *
 * Web API Action: msdyn_ShowConsumerCredentials
 */
export class msdyn_ShowConsumerCredentialsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShowConsumerCredentialsResponse>
{
  constructor(
    public msdyn_octwitterapplicationId: string,
    public applicationId: string
  ) {
    super("msdyn_ShowConsumerCredentials");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_octwitterapplications(${this.msdyn_octwitterapplicationId})/Microsoft.Dynamics.CRM.msdyn_ShowConsumerCredentials`;

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

  async parseResponse(response: Response): Promise<msdyn_ShowConsumerCredentialsResponse> {
    const data = await response.json();
    return msdyn_ShowConsumerCredentialsResponse.fromResponse(data);
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
