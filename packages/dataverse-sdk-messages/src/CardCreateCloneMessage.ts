import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CardCreateCloneResponse as CardCreateCloneResponseData } from "./types/index.js";

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
}

/**
 * CardCreateClone response message
 */
export class CardCreateCloneResponse extends OrganizationResponse {
  constructor(public result: CardCreateCloneResponseData) {
    super("CardCreateClone");
  }

  static fromResponse(data: unknown): CardCreateCloneResponse {
    return new CardCreateCloneResponse(responseObject<CardCreateCloneResponseData>(data));
  }
}
