import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CardGetFullJsonResponse as CardGetFullJsonResponseData } from "./types/index.js";

/**
 * Parameters of the CardGetFullJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CardGetFullJsonRequestParameters {
  CardId: string;
}

/**
 * CardGetFullJson request message
 *
 * Web API Action: CardGetFullJson
 */
export class CardGetFullJsonRequest
  extends OrganizationRequest
  implements Executable<CardGetFullJsonResponse>
{
  declare readonly Parameters: Readonly<CardGetFullJsonRequestParameters>;

  constructor(parameters: CardGetFullJsonRequestParameters) {
    super("CardGetFullJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CardGetFullJson`;

    const body = requestBody({
      CardId: this.Parameters.CardId,
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
    return CardGetFullJsonResponse.fromResponse(text ? JSON.parse(text) : {});
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
