import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CategorizeTextResponse as CategorizeTextResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CategorizeTextResponse.fromResponse({});
    return CategorizeTextResponse.fromResponse(await response.json());
  }
}

/**
 * CategorizeText response message
 */
export class CategorizeTextResponse extends OrganizationResponse {
  constructor(public result: CategorizeTextResponseData) {
    super("CategorizeText");
  }

  static fromResponse(data: unknown): CategorizeTextResponse {
    return new CategorizeTextResponse(responseObject<CategorizeTextResponseData>(data));
  }
}
