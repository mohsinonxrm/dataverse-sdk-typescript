import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_LogPlatformSummaryInteraction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogPlatformSummaryInteractionRequestParameters {
  Context?: string;
  InteractionData?: string;
  InteractionType?: string;
}

/**
 * msdyn_LogPlatformSummaryInteraction request message
 *
 * Web API Action: msdyn_LogPlatformSummaryInteraction
 */
export class msdyn_LogPlatformSummaryInteractionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LogPlatformSummaryInteractionResponse>
{
  declare readonly Parameters: Readonly<msdyn_LogPlatformSummaryInteractionRequestParameters>;

  constructor(parameters: msdyn_LogPlatformSummaryInteractionRequestParameters = {}) {
    super("msdyn_LogPlatformSummaryInteraction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogPlatformSummaryInteraction`;

    const body = requestBody({
      Context: this.Parameters.Context,
      InteractionData: this.Parameters.InteractionData,
      InteractionType: this.Parameters.InteractionType,
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
    return msdyn_LogPlatformSummaryInteractionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_LogPlatformSummaryInteraction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LogPlatformSummaryInteractionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_LogPlatformSummaryInteraction response message
 *
 * `result` is the value the msdyn_LogPlatformSummaryInteraction action returns (see {@link msdyn_LogPlatformSummaryInteractionResult}).
 */
export class msdyn_LogPlatformSummaryInteractionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LogPlatformSummaryInteractionResult) {
    super("msdyn_LogPlatformSummaryInteraction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LogPlatformSummaryInteractionResponse {
    return new msdyn_LogPlatformSummaryInteractionResponse(
      data as msdyn_LogPlatformSummaryInteractionResult
    );
  }
}
