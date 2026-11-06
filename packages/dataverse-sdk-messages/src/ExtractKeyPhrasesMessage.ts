import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExtractKeyPhrasesResponse as ExtractKeyPhrasesResponseData } from "./types/index.js";

/**
 * ExtractKeyPhrases request message
 *
 * Web API Action: ExtractKeyPhrases
 */
export class ExtractKeyPhrasesRequest
  extends OrganizationRequest
  implements Executable<ExtractKeyPhrasesResponse>
{
  constructor(
    public text: string,
    public modelId?: string,
    public language?: string
  ) {
    super("ExtractKeyPhrases");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractKeyPhrases`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
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

  async parseResponse(response: Response): Promise<ExtractKeyPhrasesResponse> {
    const data = await response.json();
    return ExtractKeyPhrasesResponse.fromResponse(data);
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
