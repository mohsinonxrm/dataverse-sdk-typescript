import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CardCreateClone request message
 *
 * Web API Action: CardCreateClone
 */
export class CardCreateCloneRequest
  extends OrganizationRequest
  implements Executable<CardCreateCloneResponse>
{
  constructor(
    public cardId: string,
    public cardName: string
  ) {
    super("CardCreateClone");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CardCreateCloneResponse> {
    const data = await response.json();
    return CardCreateCloneResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CardId: this.cardId,
      CardName: this.cardName,
    };
  }
}

/**
 * CardCreateClone response message
 */
export class CardCreateCloneResponse extends OrganizationResponse {
  constructor(public result: CardCreateCloneResponse) {
    super("CardCreateClone");
  }

  static fromResponse(data: unknown): CardCreateCloneResponse {
    return new CardCreateCloneResponse((data as any).value);
  }
}
