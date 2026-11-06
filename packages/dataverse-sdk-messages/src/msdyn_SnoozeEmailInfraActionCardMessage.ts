import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SnoozeEmailInfraActionCard message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SnoozeEmailInfraActionCardRequestParameters {
  ActionCardId: string;
  CardType: number;
  MessageId: string;
}

/**
 * msdyn_SnoozeEmailInfraActionCard request message
 *
 * Web API Action: msdyn_SnoozeEmailInfraActionCard
 */
export class msdyn_SnoozeEmailInfraActionCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_SnoozeEmailInfraActionCardResponse>
{
  declare readonly Parameters: Readonly<msdyn_SnoozeEmailInfraActionCardRequestParameters>;

  constructor(parameters: msdyn_SnoozeEmailInfraActionCardRequestParameters) {
    super("msdyn_SnoozeEmailInfraActionCard", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SnoozeEmailInfraActionCard`;

    const body = requestBody({
      ActionCardId: this.Parameters.ActionCardId,
      CardType: this.Parameters.CardType,
      MessageId: this.Parameters.MessageId,
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

  async parseResponse(response: Response): Promise<msdyn_SnoozeEmailInfraActionCardResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SnoozeEmailInfraActionCardResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SnoozeEmailInfraActionCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SnoozeEmailInfraActionCardResult {
  "@odata.context"?: string;
  Error: string;
  Result: string;
}

/**
 * msdyn_SnoozeEmailInfraActionCard response message
 *
 * `result` is the value the msdyn_SnoozeEmailInfraActionCard action returns (see {@link msdyn_SnoozeEmailInfraActionCardResult}).
 */
export class msdyn_SnoozeEmailInfraActionCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_SnoozeEmailInfraActionCardResult) {
    super("msdyn_SnoozeEmailInfraActionCard");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SnoozeEmailInfraActionCardResponse {
    return new msdyn_SnoozeEmailInfraActionCardResponse(
      data as msdyn_SnoozeEmailInfraActionCardResult
    );
  }
}
