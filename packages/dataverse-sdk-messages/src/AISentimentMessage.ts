import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AISentiment message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISentimentRequestParameters {
  Text: string;
}

/**
 * AISentiment request message
 *
 * Web API Action: AISentiment
 */
export class AISentimentRequest
  extends OrganizationRequest
  implements Executable<AISentimentResponse>
{
  declare readonly Parameters: Readonly<AISentimentRequestParameters>;

  constructor(parameters: AISentimentRequestParameters) {
    super("AISentiment", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISentiment`;

    const body = requestBody({
      Text: this.Parameters.Text,
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

  async parseResponse(response: Response): Promise<AISentimentResponse> {
    // The body is the complex value, with its @odata.context
    return AISentimentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AISentiment action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISentimentResult {
  "@odata.context"?: string;
  AnalyzedSentiment: string;
}

/**
 * AISentiment response message
 *
 * `result` is the value the AISentiment action returns (see {@link AISentimentResult}).
 */
export class AISentimentResponse extends OrganizationResponse {
  constructor(public result: AISentimentResult) {
    super("AISentiment");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AISentimentResponse {
    return new AISentimentResponse(data as AISentimentResult);
  }
}
