import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DismissEmailInfraActionCard message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissEmailInfraActionCardRequestParameters {
  ActionCardId: string;
  MessageId: string;
  CardType: number;
}

/**
 * msdyn_DismissEmailInfraActionCard request message
 *
 * Web API Action: msdyn_DismissEmailInfraActionCard
 */
export class msdyn_DismissEmailInfraActionCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissEmailInfraActionCardResponse>
{
  declare readonly Parameters: Readonly<msdyn_DismissEmailInfraActionCardRequestParameters>;

  constructor(parameters: msdyn_DismissEmailInfraActionCardRequestParameters) {
    super("msdyn_DismissEmailInfraActionCard", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissEmailInfraActionCard`;

    const body = requestBody({
      ActionCardId: this.Parameters.ActionCardId,
      MessageId: this.Parameters.MessageId,
      CardType: this.Parameters.CardType,
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

  async parseResponse(response: Response): Promise<msdyn_DismissEmailInfraActionCardResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_DismissEmailInfraActionCardResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_DismissEmailInfraActionCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_DismissEmailInfraActionCardResult {
  "@odata.context"?: string;
  Error: string;
  Result: boolean;
}

/**
 * msdyn_DismissEmailInfraActionCard response message
 *
 * `result` is the value the msdyn_DismissEmailInfraActionCard action returns (see {@link msdyn_DismissEmailInfraActionCardResult}).
 */
export class msdyn_DismissEmailInfraActionCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_DismissEmailInfraActionCardResult) {
    super("msdyn_DismissEmailInfraActionCard");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_DismissEmailInfraActionCardResponse {
    return new msdyn_DismissEmailInfraActionCardResponse(
      data as msdyn_DismissEmailInfraActionCardResult
    );
  }
}
