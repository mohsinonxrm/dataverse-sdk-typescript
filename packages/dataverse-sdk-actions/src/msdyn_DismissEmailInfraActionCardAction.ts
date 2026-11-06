import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DismissEmailInfraActionCard action
 */
export interface msdyn_DismissEmailInfraActionCardResponse {
  Result: boolean;
  Error: string;
}

/**
 * Parameters of the msdyn_DismissEmailInfraActionCard action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissEmailInfraActionCardActionParameters {
  ActionCardId: string;
  MessageId: string;
  CardType: number;
}

/**
 * msdyn_DismissEmailInfraActionCard action
 *
 * Unbound action
 */
export class msdyn_DismissEmailInfraActionCardAction implements Executable<msdyn_DismissEmailInfraActionCardResponse> {
  constructor(public readonly parameters: msdyn_DismissEmailInfraActionCardActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissEmailInfraActionCard`;

    const body = requestBody({
      ActionCardId: this.parameters.ActionCardId,
      MessageId: this.parameters.MessageId,
      CardType: this.parameters.CardType,
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

  async parseResponse(response: Response): Promise<msdyn_DismissEmailInfraActionCardResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_DismissEmailInfraActionCardResponse;
  }
}
