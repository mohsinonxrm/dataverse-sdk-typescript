import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AITranslateResponse as AITranslateResponseData } from "./types/index.js";

/**
 * AITranslate request message
 *
 * Web API Action: AITranslate
 */
export class AITranslateRequest
  extends OrganizationRequest
  implements Executable<AITranslateResponse>
{
  constructor(
    public targetLanguage: string | undefined,
    public text: string
  ) {
    super("AITranslate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AITranslate`;

    const body: Record<string, unknown> = {
      TargetLanguage: this.targetLanguage,
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

  async parseResponse(response: Response): Promise<AITranslateResponse> {
    const data = await response.json();
    return AITranslateResponse.fromResponse(data);
  }
}

/**
 * AITranslate response message
 */
export class AITranslateResponse extends OrganizationResponse {
  constructor(public result: AITranslateResponseData) {
    super("AITranslate");
  }

  static fromResponse(data: unknown): AITranslateResponse {
    return new AITranslateResponse(responseObject<AITranslateResponseData>(data));
  }
}
