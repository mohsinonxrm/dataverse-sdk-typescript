import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { RecognizeTextResponse as RecognizeTextResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return RecognizeTextResponse.fromResponse({});
    return RecognizeTextResponse.fromResponse(await response.json());
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
