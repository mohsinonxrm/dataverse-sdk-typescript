import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CardCreateClone action
 */
export interface CardCreateCloneResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CardCreateCloneResponse;
  }
}
