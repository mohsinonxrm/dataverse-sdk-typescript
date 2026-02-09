import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SnoozeEmailInfraActionCard action
 */
export interface msdyn_SnoozeEmailInfraActionCardResponse {
  Result: string;
  Error: string;
}

/**
 * msdyn_SnoozeEmailInfraActionCard action
 *
 * Unbound action
 */
export class msdyn_SnoozeEmailInfraActionCardAction implements Executable<msdyn_SnoozeEmailInfraActionCardResponse> {
  constructor(
    public readonly actionCardId: string,
    public readonly cardType: number,
    public readonly messageId: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SnoozeEmailInfraActionCardResponse> {
    const data = await response.json();
    return data as msdyn_SnoozeEmailInfraActionCardResponse;
  }
}
