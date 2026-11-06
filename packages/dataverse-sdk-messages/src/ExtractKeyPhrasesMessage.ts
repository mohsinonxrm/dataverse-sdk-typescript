import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExtractKeyPhrasesResponse as ExtractKeyPhrasesResponseData } from "./types/index.js";

/**
 * Parameters of the ExtractKeyPhrases message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExtractKeyPhrasesRequestParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * ExtractKeyPhrases request message
 *
 * Web API Action: ExtractKeyPhrases
 */
export class ExtractKeyPhrasesRequest
  extends OrganizationRequest
  implements Executable<ExtractKeyPhrasesResponse>
{
  declare readonly Parameters: Readonly<ExtractKeyPhrasesRequestParameters>;

  constructor(parameters: ExtractKeyPhrasesRequestParameters) {
    super("ExtractKeyPhrases", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractKeyPhrases`;

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

  async parseResponse(response: Response): Promise<ExtractKeyPhrasesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ExtractKeyPhrasesResponse.fromResponse({});
    return ExtractKeyPhrasesResponse.fromResponse(await response.json());
  }
}

/**
 * ExtractKeyPhrases response message
 */
export class ExtractKeyPhrasesResponse extends OrganizationResponse {
  constructor(public result: ExtractKeyPhrasesResponseData) {
    super("ExtractKeyPhrases");
  }

  static fromResponse(data: unknown): ExtractKeyPhrasesResponse {
    return new ExtractKeyPhrasesResponse(responseObject<ExtractKeyPhrasesResponseData>(data));
  }
}
