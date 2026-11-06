import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DetectLanguageResponse as DetectLanguageResponseData } from "./types/index.js";

/**
 * DetectLanguage request message
 *
 * Web API Action: DetectLanguage
 */
export class DetectLanguageRequest
  extends OrganizationRequest
  implements Executable<DetectLanguageResponse>
{
  constructor(
    public text: string,
    public modelId?: string,
    public countryHint?: string
  ) {
    super("DetectLanguage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DetectLanguage`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      countryHint: this.countryHint,
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

  async parseResponse(response: Response): Promise<DetectLanguageResponse> {
    const data = await response.json();
    return DetectLanguageResponse.fromResponse(data);
  }
}

/**
 * DetectLanguage response message
 */
export class DetectLanguageResponse extends OrganizationResponse {
  constructor(public result: DetectLanguageResponseData) {
    super("DetectLanguage");
  }

  static fromResponse(data: unknown): DetectLanguageResponse {
    return new DetectLanguageResponse(responseObject<DetectLanguageResponseData>(data));
  }
}
