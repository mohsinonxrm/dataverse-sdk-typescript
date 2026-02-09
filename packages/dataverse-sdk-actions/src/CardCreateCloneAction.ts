import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CardCreateClone action
 */
export interface CardCreateCloneResponse {
  CardIdClone: string;
}

/**
 * CardCreateClone action
 *
 * Unbound action
 */
export class CardCreateCloneAction implements Executable<CardCreateCloneResponse> {
  constructor(
    public readonly cardId: string,
    public readonly cardName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardCreateClone`;

    const body: Record<string, unknown> = {
      CardId: this.cardId,
      CardName: this.cardName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CardCreateCloneResponse> {
    const data = await response.json();
    return data as CardCreateCloneResponse;
  }
}
