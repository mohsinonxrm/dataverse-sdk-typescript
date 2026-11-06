import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CardGetFullJson action
 */
export interface CardGetFullJsonResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CardGetFullJsonResponse;
  }
}
