import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ShowConsumerCredentials action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShowConsumerCredentialsResponse {
  "@odata.context"?: string;
  ConsumerKeyValue: string;
  ConsumerSecretValue: string;
}

/**
 * Parameters of the msdyn_ShowConsumerCredentials action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShowConsumerCredentialsActionParameters {
  ApplicationId: string;
}

/**
 * msdyn_ShowConsumerCredentials action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_octwitterapplication)
 *
 * The first argument is the id of the msdyn_octwitterapplication record to call it on.
 */
export class msdyn_ShowConsumerCredentialsAction implements Executable<msdyn_ShowConsumerCredentialsResponse> {
  constructor(
    public readonly msdyn_octwitterapplicationId: string,
    public readonly parameters: msdyn_ShowConsumerCredentialsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_octwitterapplications(${this.msdyn_octwitterapplicationId})/Microsoft.Dynamics.CRM.msdyn_ShowConsumerCredentials`;

    const body = requestBody({
      ApplicationId: this.parameters.ApplicationId,
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
    return (await response.json()) as msdyn_ShowConsumerCredentialsResponse;
  }
}
