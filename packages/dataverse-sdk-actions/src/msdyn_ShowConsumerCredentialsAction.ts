import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ShowConsumerCredentials action
 */
export interface msdyn_ShowConsumerCredentialsResponse {
  ConsumerKeyValue: string;
  ConsumerSecretValue: string;
}

/**
 * msdyn_ShowConsumerCredentials action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_octwitterapplication)
 */
export class msdyn_ShowConsumerCredentialsAction implements Executable<msdyn_ShowConsumerCredentialsResponse> {
  constructor(
    public readonly msdyn_octwitterapplicationId: string,
    public readonly applicationId: string
  ) {}

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
    return data as msdyn_ShowConsumerCredentialsResponse;
  }
}
