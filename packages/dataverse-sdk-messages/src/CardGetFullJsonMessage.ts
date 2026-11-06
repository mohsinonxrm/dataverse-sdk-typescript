import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CardGetFullJsonResponse as CardGetFullJsonResponseData } from "./types/index.js";

/**
 * CardGetFullJson request message
 *
 * Web API Action: CardGetFullJson
 */
export class CardGetFullJsonRequest
  extends OrganizationRequest
  implements Executable<CardGetFullJsonResponse>
{
  constructor(public cardId: string) {
    super("CardGetFullJson");
  }

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
    return CardGetFullJsonResponse.fromResponse(data);
  }
}

/**
 * CardGetFullJson response message
 */
export class CardGetFullJsonResponse extends OrganizationResponse {
  constructor(public result: CardGetFullJsonResponseData) {
    super("CardGetFullJson");
  }

  static fromResponse(data: unknown): CardGetFullJsonResponse {
    return new CardGetFullJsonResponse(responseObject<CardGetFullJsonResponseData>(data));
  }
}
