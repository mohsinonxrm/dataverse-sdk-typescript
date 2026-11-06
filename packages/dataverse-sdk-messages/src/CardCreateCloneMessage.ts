import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CardCreateCloneResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CardCreateClone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CardCreateCloneResult {
  "@odata.context"?: string;
  CardIdClone: string;
}

/**
 * CardCreateClone response message
 *
 * `result` is the value the CardCreateClone action returns (see {@link CardCreateCloneResult}).
 */
export class CardCreateCloneResponse extends OrganizationResponse {
  constructor(public result: CardCreateCloneResult) {
    super("CardCreateClone");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CardCreateCloneResponse {
    return new CardCreateCloneResponse(data as CardCreateCloneResult);
  }
}
