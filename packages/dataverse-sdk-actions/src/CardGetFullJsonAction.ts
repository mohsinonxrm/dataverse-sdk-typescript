import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CardGetFullJson action
 */
export interface CardGetFullJsonResponse {
  CardFullJson: string;
}

/**
 * CardGetFullJson action
 *
 * Unbound action
 */
export class CardGetFullJsonAction implements Executable<CardGetFullJsonResponse> {
  constructor(public readonly cardId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardGetFullJson`;

    const body: Record<string, unknown> = {
      CardId: this.cardId,
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

  async parseResponse(response: Response): Promise<CardGetFullJsonResponse> {
    const data = await response.json();
    return data as CardGetFullJsonResponse;
  }
}
