import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AISummarizeResponse as AISummarizeResponseData } from "./types/index.js";

/**
 * Parameters of the AISummarize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRequestParameters {
  Text: string;
}

/**
 * AISummarize request message
 *
 * Web API Action: AISummarize
 */
export class AISummarizeRequest
  extends OrganizationRequest
  implements Executable<AISummarizeResponse>
{
  declare readonly Parameters: Readonly<AISummarizeRequestParameters>;

  constructor(parameters: AISummarizeRequestParameters) {
    super("AISummarize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarize`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<AISummarizeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AISummarizeResponse.fromResponse({});
    return AISummarizeResponse.fromResponse(await response.json());
  }
}

/**
 * AISummarize response message
 */
export class AISummarizeResponse extends OrganizationResponse {
  constructor(public result: AISummarizeResponseData) {
    super("AISummarize");
  }

  static fromResponse(data: unknown): AISummarizeResponse {
    return new AISummarizeResponse(responseObject<AISummarizeResponseData>(data));
  }
}
