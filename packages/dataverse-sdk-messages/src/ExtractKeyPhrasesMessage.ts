import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return ExtractKeyPhrasesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExtractKeyPhrases action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExtractKeyPhrasesResult {
  "@odata.context"?: string;
  countOfPhrases: number;
}

/**
 * ExtractKeyPhrases response message
 *
 * `result` is the value the ExtractKeyPhrases action returns (see {@link ExtractKeyPhrasesResult}).
 */
export class ExtractKeyPhrasesResponse extends OrganizationResponse {
  constructor(public result: ExtractKeyPhrasesResult) {
    super("ExtractKeyPhrases");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExtractKeyPhrasesResponse {
    return new ExtractKeyPhrasesResponse(data as ExtractKeyPhrasesResult);
  }
}
