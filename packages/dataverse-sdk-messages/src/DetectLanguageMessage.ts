import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DetectLanguageResponse as DetectLanguageResponseData } from "./types/index.js";

/**
 * Parameters of the DetectLanguage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DetectLanguageRequestParameters {
  text: string;
  modelId?: string;
  countryHint?: string;
}

/**
 * DetectLanguage request message
 *
 * Web API Action: DetectLanguage
 */
export class DetectLanguageRequest
  extends OrganizationRequest
  implements Executable<DetectLanguageResponse>
{
  declare readonly Parameters: Readonly<DetectLanguageRequestParameters>;

  constructor(parameters: DetectLanguageRequestParameters) {
    super("DetectLanguage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DetectLanguage`;

    const body = requestBody({
      text: this.Parameters.text,
      modelId: this.Parameters.modelId,
      countryHint: this.Parameters.countryHint,
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

  async parseResponse(response: Response): Promise<DetectLanguageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return DetectLanguageResponse.fromResponse({});
    return DetectLanguageResponse.fromResponse(await response.json());
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
