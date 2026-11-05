import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_PersonalizationDynamicTextAiResponse as msdynmkt_PersonalizationDynamicTextAiResponseData } from "./types/index.js";

/**
 * msdynmkt_PersonalizationDynamicTextAi request message
 *
 * Web API Action: msdynmkt_PersonalizationDynamicTextAi
 */
export class msdynmkt_PersonalizationDynamicTextAiRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationDynamicTextAiResponse>
{
  constructor(public msdynmkt_PersonalizationDynamicTextAiRequest: string) {
    super("msdynmkt_PersonalizationDynamicTextAi");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationDynamicTextAi`;

    const body: Record<string, unknown> = {
      msdynmkt_PersonalizationDynamicTextAiRequest:
        this.msdynmkt_PersonalizationDynamicTextAiRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationDynamicTextAiResponse> {
    const data = await response.json();
    return msdynmkt_PersonalizationDynamicTextAiResponse.fromResponse(data);
  }
}

/**
 * msdynmkt_PersonalizationDynamicTextAi response message
 */
export class msdynmkt_PersonalizationDynamicTextAiResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationDynamicTextAiResponseData) {
    super("msdynmkt_PersonalizationDynamicTextAi");
  }

  static fromResponse(data: unknown): msdynmkt_PersonalizationDynamicTextAiResponse {
    return new msdynmkt_PersonalizationDynamicTextAiResponse(
      responseObject<msdynmkt_PersonalizationDynamicTextAiResponseData>(data)
    );
  }
}
