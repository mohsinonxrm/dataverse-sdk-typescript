import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveCustomMessagingApplicationSecret action
 */
export interface msdyn_RetrieveCustomMessagingApplicationSecretResponse {
  CustomMessagingBCRMSAppSecret: string;
}

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocbotchannelregistration)
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretAction implements Executable<msdyn_RetrieveCustomMessagingApplicationSecretResponse> {
  constructor(
    public readonly msdyn_ocbotchannelregistrationId: string,
    public readonly applicationId: string
  ) {}

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
    return data as msdyn_RetrieveCustomMessagingApplicationSecretResponse;
  }
}
