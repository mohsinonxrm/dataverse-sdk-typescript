import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_PersonalizationDynamicTextAiResponse as msdynmkt_PersonalizationDynamicTextAiResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_PersonalizationDynamicTextAi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationDynamicTextAiRequestParameters {
  msdynmkt_PersonalizationDynamicTextAiRequest: string;
}

/**
 * msdynmkt_PersonalizationDynamicTextAi request message
 *
 * Web API Action: msdynmkt_PersonalizationDynamicTextAi
 */
export class msdynmkt_PersonalizationDynamicTextAiRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationDynamicTextAiResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationDynamicTextAiRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationDynamicTextAiRequestParameters) {
    super("msdynmkt_PersonalizationDynamicTextAi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationDynamicTextAi`;

    const body = requestBody({
      msdynmkt_PersonalizationDynamicTextAiRequest:
        this.Parameters.msdynmkt_PersonalizationDynamicTextAiRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationDynamicTextAiResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_PersonalizationDynamicTextAiResponse.fromResponse({});
    return msdynmkt_PersonalizationDynamicTextAiResponse.fromResponse(await response.json());
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
