import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_LogPlatformSummaryInteractionResponse as msdyn_LogPlatformSummaryInteractionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_LogPlatformSummaryInteraction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogPlatformSummaryInteractionRequestParameters {
  InteractionData?: string;
  Context?: string;
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
      InteractionData: this.Parameters.InteractionData,
      Context: this.Parameters.Context,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_LogPlatformSummaryInteractionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_LogPlatformSummaryInteraction response message
 */
export class msdyn_LogPlatformSummaryInteractionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LogPlatformSummaryInteractionResponseData) {
    super("msdyn_LogPlatformSummaryInteraction");
  }

  static fromResponse(data: unknown): msdyn_LogPlatformSummaryInteractionResponse {
    return new msdyn_LogPlatformSummaryInteractionResponse(
      responseObject<msdyn_LogPlatformSummaryInteractionResponseData>(data)
    );
  }
}
