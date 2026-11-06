import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CardCreateClone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CardCreateCloneResponse {
  "@odata.context"?: string;
  CardIdClone: string;
}

/**
 * Parameters of the CardCreateClone action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CardCreateCloneActionParameters {
  CardId: string;
  CardName: string;
}

/**
 * CardCreateClone action
 *
 * Unbound action
 */
export class CardCreateCloneAction implements Executable<CardCreateCloneResponse> {
  constructor(public readonly parameters: CardCreateCloneActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardCreateClone`;

    const body = requestBody({
      CardId: this.parameters.CardId,
      CardName: this.parameters.CardName,
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

  async parseResponse(response: Response): Promise<CardCreateCloneResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CardCreateCloneResponse;
  }
}
