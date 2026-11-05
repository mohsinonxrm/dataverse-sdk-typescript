import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_LogPlatformSummaryInteraction request message
 *
 * Web API Action: msdyn_LogPlatformSummaryInteraction
 */
export class msdyn_LogPlatformSummaryInteractionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LogPlatformSummaryInteractionResponse>
{
  constructor(
    public interactionData: string,
    public context: string,
    public interactionType: string
  ) {
    super("msdyn_LogPlatformSummaryInteraction");
  }

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
    return msdyn_LogPlatformSummaryInteractionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InteractionData: this.interactionData,
      Context: this.context,
      InteractionType: this.interactionType,
    };
  }
}

/**
 * msdyn_LogPlatformSummaryInteraction response message
 */
export class msdyn_LogPlatformSummaryInteractionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LogPlatformSummaryInteractionResponse) {
    super("msdyn_LogPlatformSummaryInteraction");
  }

  static fromResponse(data: unknown): msdyn_LogPlatformSummaryInteractionResponse {
    return new msdyn_LogPlatformSummaryInteractionResponse((data as any).value);
  }
}
