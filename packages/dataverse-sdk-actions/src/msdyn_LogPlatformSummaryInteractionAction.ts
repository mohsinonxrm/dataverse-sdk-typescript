import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_LogPlatformSummaryInteraction action
 */
export interface msdyn_LogPlatformSummaryInteractionResponse {
  Result: string;
}

/**
 * msdyn_LogPlatformSummaryInteraction action
 *
 * Unbound action
 */
export class msdyn_LogPlatformSummaryInteractionAction implements Executable<msdyn_LogPlatformSummaryInteractionResponse> {
  constructor(
    public readonly interactionData: string,
    public readonly context: string,
    public readonly interactionType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogPlatformSummaryInteraction`;

    const body: Record<string, unknown> = {
      InteractionData: this.interactionData,
      Context: this.context,
      InteractionType: this.interactionType,
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

  async parseResponse(response: Response): Promise<msdyn_LogPlatformSummaryInteractionResponse> {
    const data = await response.json();
    return data as msdyn_LogPlatformSummaryInteractionResponse;
  }
}
