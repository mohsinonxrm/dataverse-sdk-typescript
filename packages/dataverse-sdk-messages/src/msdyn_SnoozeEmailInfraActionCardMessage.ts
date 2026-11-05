import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SnoozeEmailInfraActionCardResponse as msdyn_SnoozeEmailInfraActionCardResponseData } from "./types/index.js";

/**
 * msdyn_SnoozeEmailInfraActionCard request message
 *
 * Web API Action: msdyn_SnoozeEmailInfraActionCard
 */
export class msdyn_SnoozeEmailInfraActionCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_SnoozeEmailInfraActionCardResponse>
{
  constructor(
    public actionCardId: string,
    public cardType: number,
    public messageId: string
  ) {
    super("msdyn_SnoozeEmailInfraActionCard");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SnoozeEmailInfraActionCard`;

    const body: Record<string, unknown> = {
      ActionCardId: this.actionCardId,
      CardType: this.cardType,
      MessageId: this.messageId,
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

  async parseResponse(response: Response): Promise<msdyn_SnoozeEmailInfraActionCardResponse> {
    const data = await response.json();
    return msdyn_SnoozeEmailInfraActionCardResponse.fromResponse(data);
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
