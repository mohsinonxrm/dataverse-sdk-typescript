import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CardGetFullJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CardGetFullJsonResponse {
  "@odata.context"?: string;
  CardFullJson: string;
}

/**
 * Parameters of the CardGetFullJson action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CardGetFullJsonActionParameters {
  CardId: string;
}

/**
 * CardGetFullJson action
 *
 * Unbound action
 */
export class CardGetFullJsonAction implements Executable<CardGetFullJsonResponse> {
  constructor(public readonly parameters: CardGetFullJsonActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardGetFullJson`;

    const body = requestBody({
      CardId: this.parameters.CardId,
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

  async parseResponse(response: Response): Promise<CardGetFullJsonResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CardGetFullJsonResponse;
  }
}
