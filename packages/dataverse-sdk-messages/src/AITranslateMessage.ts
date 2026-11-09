import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AITranslate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AITranslateRequestParameters {
  TargetLanguage?: string;
  Text: string;
}

/**
 * AITranslate request message
 *
 * Web API Action: AITranslate
 */
export class AITranslateRequest
  extends OrganizationRequest
  implements Executable<AITranslateResponse>
{
  declare readonly Parameters: Readonly<AITranslateRequestParameters>;

  constructor(parameters: AITranslateRequestParameters) {
    super("AITranslate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AITranslate`;

    const body = requestBody({
      TargetLanguage: this.Parameters.TargetLanguage,
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

  async parseResponse(response: Response): Promise<AITranslateResponse> {
    // The body is the complex value, with its @odata.context
    return AITranslateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AITranslate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AITranslateResult {
  "@odata.context"?: string;
  TranslatedText: string;
}

/**
 * AITranslate response message
 *
 * `result` is the value the AITranslate action returns (see {@link AITranslateResult}).
 */
export class AITranslateResponse extends OrganizationResponse {
  constructor(public result: AITranslateResult) {
    super("AITranslate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AITranslateResponse {
    return new AITranslateResponse(data as AITranslateResult);
  }
}
