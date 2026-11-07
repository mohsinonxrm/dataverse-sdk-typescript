import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SnoozeEmailInfraActionCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SnoozeEmailInfraActionCardResponse {
  "@odata.context"?: string;
  Error: string;
  Result: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SnoozeEmailInfraActionCardResponse;
  }
}
