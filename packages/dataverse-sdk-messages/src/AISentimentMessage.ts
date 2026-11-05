import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AISentimentResponse as AISentimentResponseData } from "./types/index.js";

/**
 * AISentiment request message
 *
 * Web API Action: AISentiment
 */
export class AISentimentRequest
  extends OrganizationRequest
  implements Executable<AISentimentResponse>
{
  constructor(public text: string) {
    super("AISentiment");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISentiment`;

    const body: Record<string, unknown> = {
      Text: this.text,
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

  async parseResponse(response: Response): Promise<AISentimentResponse> {
    const data = await response.json();
    return AISentimentResponse.fromResponse(data);
  }
}

/**
 * AISentiment response message
 */
export class AISentimentResponse extends OrganizationResponse {
  constructor(public result: AISentimentResponseData) {
    super("AISentiment");
  }

  static fromResponse(data: unknown): AISentimentResponse {
    return new AISentimentResponse(responseObject<AISentimentResponseData>(data));
  }
}
