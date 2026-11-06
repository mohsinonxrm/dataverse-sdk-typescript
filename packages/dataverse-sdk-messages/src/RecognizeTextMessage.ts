import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { RecognizeTextResponse as RecognizeTextResponseData } from "./types/index.js";

/**
 * RecognizeText request message
 *
 * Web API Action: RecognizeText
 */
export class RecognizeTextRequest
  extends OrganizationRequest
  implements Executable<RecognizeTextResponse>
{
  constructor(
    public modelId: string | undefined,
    public base64encoded: string,
    public source?: string
  ) {
    super("RecognizeText");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecognizeText`;

    const body: Record<string, unknown> = {
      modelId: this.modelId,
      base64encoded: this.base64encoded,
      source: this.source,
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

  async parseResponse(response: Response): Promise<RecognizeTextResponse> {
    const data = await response.json();
    return RecognizeTextResponse.fromResponse(data);
  }
}

/**
 * RecognizeText response message
 */
export class RecognizeTextResponse extends OrganizationResponse {
  constructor(public result: RecognizeTextResponseData) {
    super("RecognizeText");
  }

  static fromResponse(data: unknown): RecognizeTextResponse {
    return new RecognizeTextResponse(responseObject<RecognizeTextResponseData>(data));
  }
}
