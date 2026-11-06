import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CategorizeTextResponse as CategorizeTextResponseData } from "./types/index.js";

/**
 * CategorizeText request message
 *
 * Web API Action: CategorizeText
 */
export class CategorizeTextRequest
  extends OrganizationRequest
  implements Executable<CategorizeTextResponse>
{
  constructor(
    public text: string,
    public modelId: string,
    public language: string
  ) {
    super("CategorizeText");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CategorizeText`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
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

  async parseResponse(response: Response): Promise<CategorizeTextResponse> {
    const data = await response.json();
    return CategorizeTextResponse.fromResponse(data);
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
