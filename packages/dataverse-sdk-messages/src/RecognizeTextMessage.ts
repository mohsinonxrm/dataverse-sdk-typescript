import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RecognizeText message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RecognizeTextRequestParameters {
  modelId?: string;
  base64encoded: string;
  source?: string;
}

/**
 * RecognizeText request message
 *
 * Web API Action: RecognizeText
 */
export class RecognizeTextRequest
  extends OrganizationRequest
  implements Executable<RecognizeTextResponse>
{
  declare readonly Parameters: Readonly<RecognizeTextRequestParameters>;

  constructor(parameters: RecognizeTextRequestParameters) {
    super("RecognizeText", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecognizeText`;

    const body = requestBody({
      modelId: this.Parameters.modelId,
      base64encoded: this.Parameters.base64encoded,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<RecognizeTextResponse> {
    // The body is the complex value, with its @odata.context
    return RecognizeTextResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RecognizeText action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RecognizeTextResult {
  "@odata.context"?: string;
  countOfPages: number;
}

/**
 * RecognizeText response message
 *
 * `result` is the value the RecognizeText action returns (see {@link RecognizeTextResult}).
 */
export class RecognizeTextResponse extends OrganizationResponse {
  constructor(public result: RecognizeTextResult) {
    super("RecognizeText");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RecognizeTextResponse {
    return new RecognizeTextResponse(data as RecognizeTextResult);
  }
}
