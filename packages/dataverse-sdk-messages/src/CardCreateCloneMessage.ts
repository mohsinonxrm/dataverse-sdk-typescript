import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CardCreateCloneResponse as CardCreateCloneResponseData } from "./types/index.js";

/**
 * Parameters of the CardCreateClone message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CardCreateCloneRequestParameters {
  CardId: string;
  CardName: string;
}

/**
 * CardCreateClone request message
 *
 * Web API Action: CardCreateClone
 */
export class CardCreateCloneRequest
  extends OrganizationRequest
  implements Executable<CardCreateCloneResponse>
{
  declare readonly Parameters: Readonly<CardCreateCloneRequestParameters>;

  constructor(parameters: CardCreateCloneRequestParameters) {
    super("CardCreateClone", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardCreateClone`;

    const body = requestBody({
      CardId: this.Parameters.CardId,
      CardName: this.Parameters.CardName,
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
    return CardCreateCloneResponse.fromResponse(text ? JSON.parse(text) : {});
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
