import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CategorizeText message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CategorizeTextRequestParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * CategorizeText request message
 *
 * Web API Action: CategorizeText
 */
export class CategorizeTextRequest
  extends OrganizationRequest
  implements Executable<CategorizeTextResponse>
{
  declare readonly Parameters: Readonly<CategorizeTextRequestParameters>;

  constructor(parameters: CategorizeTextRequestParameters) {
    super("CategorizeText", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CategorizeText`;

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

  async parseResponse(response: Response): Promise<CategorizeTextResponse> {
    // The body is the complex value, with its @odata.context
    return CategorizeTextResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CategorizeText action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CategorizeTextResult {
  "@odata.context"?: string;
  originalText: string;
}

/**
 * CategorizeText response message
 *
 * `result` is the value the CategorizeText action returns (see {@link CategorizeTextResult}).
 */
export class CategorizeTextResponse extends OrganizationResponse {
  constructor(public result: CategorizeTextResult) {
    super("CategorizeText");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CategorizeTextResponse {
    return new CategorizeTextResponse(data as CategorizeTextResult);
  }
}
