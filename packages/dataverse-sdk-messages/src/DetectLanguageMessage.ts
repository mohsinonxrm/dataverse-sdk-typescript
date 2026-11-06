import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return DetectLanguageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DetectLanguage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DetectLanguageResult {
  "@odata.context"?: string;
  language: string;
  score: number;
}

/**
 * DetectLanguage response message
 *
 * `result` is the value the DetectLanguage action returns (see {@link DetectLanguageResult}).
 */
export class DetectLanguageResponse extends OrganizationResponse {
  constructor(public result: DetectLanguageResult) {
    super("DetectLanguage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DetectLanguageResponse {
    return new DetectLanguageResponse(data as DetectLanguageResult);
  }
}
