import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_RetrieveCustomMessagingApplicationSecret action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveCustomMessagingApplicationSecretResponse {
  "@odata.context"?: string;
  CustomMessagingBCRMSAppSecret: string;
}

/**
 * Parameters of the msdyn_RetrieveCustomMessagingApplicationSecret action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveCustomMessagingApplicationSecretActionParameters {
  ApplicationId: string;
}

/**
 * msdyn_RetrieveCustomMessagingApplicationSecret action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocbotchannelregistration)
 *
 * The first argument is the id of the msdyn_ocbotchannelregistration record to call it on.
 */
export class msdyn_RetrieveCustomMessagingApplicationSecretAction implements Executable<msdyn_RetrieveCustomMessagingApplicationSecretResponse> {
  constructor(
    public readonly msdyn_ocbotchannelregistrationId: string,
    public readonly parameters: msdyn_RetrieveCustomMessagingApplicationSecretActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocbotchannelregistrations(${this.msdyn_ocbotchannelregistrationId})/Microsoft.Dynamics.CRM.msdyn_RetrieveCustomMessagingApplicationSecret`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_RetrieveCustomMessagingApplicationSecretResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveCustomMessagingApplicationSecretResponse;
  }
}
