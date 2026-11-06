import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AITranslateResponse as AITranslateResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return AITranslateResponse.fromResponse({});
    return AITranslateResponse.fromResponse(await response.json());
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
