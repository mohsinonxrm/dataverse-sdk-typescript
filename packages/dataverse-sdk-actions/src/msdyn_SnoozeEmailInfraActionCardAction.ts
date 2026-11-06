import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SnoozeEmailInfraActionCard action
 */
export interface msdyn_SnoozeEmailInfraActionCardResponse {
  Result: string;
  Error: string;
}

/**
 * Parameters of the msdyn_SnoozeEmailInfraActionCard action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SnoozeEmailInfraActionCardActionParameters {
  ActionCardId: string;
  CardType: number;
  MessageId: string;
}

/**
 * msdyn_SnoozeEmailInfraActionCard action
 *
 * Unbound action
 */
export class msdyn_SnoozeEmailInfraActionCardAction implements Executable<msdyn_SnoozeEmailInfraActionCardResponse> {
  constructor(public readonly parameters: msdyn_SnoozeEmailInfraActionCardActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SnoozeEmailInfraActionCard`;

    const body = requestBody({
      ActionCardId: this.parameters.ActionCardId,
      CardType: this.parameters.CardType,
      MessageId: this.parameters.MessageId,
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

  async parseResponse(response: Response): Promise<msdyn_SnoozeEmailInfraActionCardResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SnoozeEmailInfraActionCardResponse;
    return (await response.json()) as msdyn_SnoozeEmailInfraActionCardResponse;
  }
}
