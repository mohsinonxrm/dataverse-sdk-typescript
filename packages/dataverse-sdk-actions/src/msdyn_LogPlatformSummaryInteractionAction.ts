import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_LogPlatformSummaryInteraction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LogPlatformSummaryInteractionResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_LogPlatformSummaryInteraction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogPlatformSummaryInteractionActionParameters {
  Context?: string;
  InteractionData?: string;
  InteractionType?: string;
}

/**
 * msdyn_LogPlatformSummaryInteraction action
 *
 * Unbound action
 */
export class msdyn_LogPlatformSummaryInteractionAction implements Executable<msdyn_LogPlatformSummaryInteractionResponse> {
  constructor(
    public readonly parameters: msdyn_LogPlatformSummaryInteractionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogPlatformSummaryInteraction`;

    const body = requestBody({
      Context: this.parameters.Context,
      InteractionData: this.parameters.InteractionData,
      InteractionType: this.parameters.InteractionType,
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

  async parseResponse(response: Response): Promise<msdyn_LogPlatformSummaryInteractionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_LogPlatformSummaryInteractionResponse;
  }
}
