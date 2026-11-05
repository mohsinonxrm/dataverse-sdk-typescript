import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DismissEmailInfraActionCard action
 */
export interface msdyn_DismissEmailInfraActionCardResponse {
  Result: boolean;
  Error: string;
}

/**
 * msdyn_DismissEmailInfraActionCard action
 *
 * Unbound action
 */
export class msdyn_DismissEmailInfraActionCardAction implements Executable<msdyn_DismissEmailInfraActionCardResponse> {
  constructor(
    public readonly actionCardId: string,
    public readonly messageId: string,
    public readonly cardType: number
  ) {}

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
    return data as msdyn_DismissEmailInfraActionCardResponse;
  }
}
