import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DismissEmailInfraActionCard request message
 *
 * Web API Action: msdyn_DismissEmailInfraActionCard
 */
export class msdyn_DismissEmailInfraActionCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissEmailInfraActionCardResponse>
{
  constructor(
    public actionCardId: string,
    public messageId: string,
    public cardType: number
  ) {
    super("msdyn_DismissEmailInfraActionCard");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissEmailInfraActionCard`;

    const body: Record<string, unknown> = {
      ActionCardId: this.actionCardId,
      MessageId: this.messageId,
      CardType: this.cardType,
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

  async parseResponse(response: Response): Promise<msdyn_DismissEmailInfraActionCardResponse> {
    const data = await response.json();
    return msdyn_DismissEmailInfraActionCardResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ActionCardId: this.actionCardId,
      MessageId: this.messageId,
      CardType: this.cardType,
    };
  }
}

/**
 * msdyn_DismissEmailInfraActionCard response message
 */
export class msdyn_DismissEmailInfraActionCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_DismissEmailInfraActionCardResponse) {
    super("msdyn_DismissEmailInfraActionCard");
  }

  static fromResponse(data: unknown): msdyn_DismissEmailInfraActionCardResponse {
    return new msdyn_DismissEmailInfraActionCardResponse((data as any).value);
  }
}
