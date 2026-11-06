import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PersonalizationDynamicTextAi action
 */
export interface msdynmkt_PersonalizationDynamicTextAiResponse {
  msdynmkt_PersonalizationDynamicTextAiResponse: string;
}

/**
 * Parameters of the msdynmkt_PersonalizationDynamicTextAi action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationDynamicTextAiActionParameters {
  msdynmkt_PersonalizationDynamicTextAiRequest: string;
}

/**
 * msdynmkt_PersonalizationDynamicTextAi action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationDynamicTextAiAction implements Executable<msdynmkt_PersonalizationDynamicTextAiResponse> {
  constructor(public readonly parameters: msdynmkt_PersonalizationDynamicTextAiActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationDynamicTextAi`;

    const body = requestBody({
      msdynmkt_PersonalizationDynamicTextAiRequest:
        this.parameters.msdynmkt_PersonalizationDynamicTextAiRequest,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_PersonalizationDynamicTextAiResponse;
  }
}
