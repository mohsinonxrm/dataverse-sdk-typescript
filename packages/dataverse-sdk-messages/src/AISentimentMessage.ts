import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AISentimentResponse as AISentimentResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return AISentimentResponse.fromResponse({});
    return AISentimentResponse.fromResponse(await response.json());
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
