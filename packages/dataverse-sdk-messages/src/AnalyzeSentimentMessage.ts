import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return AnalyzeSentimentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AnalyzeSentiment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AnalyzeSentimentResult {
  "@odata.context"?: string;
  sentiment: string;
}

/**
 * AnalyzeSentiment response message
 *
 * `result` is the value the AnalyzeSentiment action returns (see {@link AnalyzeSentimentResult}).
 */
export class AnalyzeSentimentResponse extends OrganizationResponse {
  constructor(public result: AnalyzeSentimentResult) {
    super("AnalyzeSentiment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AnalyzeSentimentResponse {
    return new AnalyzeSentimentResponse(data as AnalyzeSentimentResult);
  }
}
