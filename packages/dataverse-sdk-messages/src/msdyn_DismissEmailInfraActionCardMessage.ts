import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_DismissEmailInfraActionCardResponse as msdyn_DismissEmailInfraActionCardResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_DismissEmailInfraActionCardResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_DismissEmailInfraActionCard response message
 */
export class msdyn_DismissEmailInfraActionCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_DismissEmailInfraActionCardResponseData) {
    super("msdyn_DismissEmailInfraActionCard");
  }

  static fromResponse(data: unknown): msdyn_DismissEmailInfraActionCardResponse {
    return new msdyn_DismissEmailInfraActionCardResponse(
      responseObject<msdyn_DismissEmailInfraActionCardResponseData>(data)
    );
  }
}
