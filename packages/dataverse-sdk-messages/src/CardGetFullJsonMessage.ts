import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CardGetFullJsonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CardGetFullJson action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CardGetFullJsonResult {
  "@odata.context"?: string;
  CardFullJson: string;
}

/**
 * CardGetFullJson response message
 *
 * `result` is the value the CardGetFullJson action returns (see {@link CardGetFullJsonResult}).
 */
export class CardGetFullJsonResponse extends OrganizationResponse {
  constructor(public result: CardGetFullJsonResult) {
    super("CardGetFullJson");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CardGetFullJsonResponse {
    return new CardGetFullJsonResponse(data as CardGetFullJsonResult);
  }
}
