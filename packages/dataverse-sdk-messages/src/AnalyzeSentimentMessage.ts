import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnalyzeSentimentResponse as AnalyzeSentimentResponseData } from "./types/index.js";

/**
 * Parameters of the AnalyzeSentiment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AnalyzeSentimentRequestParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * AnalyzeSentiment request message
 *
 * Web API Action: AnalyzeSentiment
 */
export class AnalyzeSentimentRequest
  extends OrganizationRequest
  implements Executable<AnalyzeSentimentResponse>
{
  declare readonly Parameters: Readonly<AnalyzeSentimentRequestParameters>;

  constructor(parameters: AnalyzeSentimentRequestParameters) {
    super("AnalyzeSentiment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AnalyzeSentiment`;

    const body = requestBody({
      text: this.Parameters.text,
      modelId: this.Parameters.modelId,
      language: this.Parameters.language,
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

  async parseResponse(response: Response): Promise<AnalyzeSentimentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AnalyzeSentimentResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * AnalyzeSentiment response message
 */
export class AnalyzeSentimentResponse extends OrganizationResponse {
  constructor(public result: AnalyzeSentimentResponseData) {
    super("AnalyzeSentiment");
  }

  static fromResponse(data: unknown): AnalyzeSentimentResponse {
    return new AnalyzeSentimentResponse(responseObject<AnalyzeSentimentResponseData>(data));
  }
}
