import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SnoozeEmailInfraActionCardResponse as msdyn_SnoozeEmailInfraActionCardResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_SnoozeEmailInfraActionCardResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_SnoozeEmailInfraActionCard response message
 */
export class msdyn_SnoozeEmailInfraActionCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_SnoozeEmailInfraActionCardResponseData) {
    super("msdyn_SnoozeEmailInfraActionCard");
  }

  static fromResponse(data: unknown): msdyn_SnoozeEmailInfraActionCardResponse {
    return new msdyn_SnoozeEmailInfraActionCardResponse(
      responseObject<msdyn_SnoozeEmailInfraActionCardResponseData>(data)
    );
  }
}
