import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExtractTextEntitiesResponse as ExtractTextEntitiesResponseData } from "./types/index.js";

/**
 * Parameters of the ExtractTextEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExtractTextEntitiesRequestParameters {
  text: string;
  modelId?: string;
  language?: string;
}

/**
 * ExtractTextEntities request message
 *
 * Web API Action: ExtractTextEntities
 */
export class ExtractTextEntitiesRequest
  extends OrganizationRequest
  implements Executable<ExtractTextEntitiesResponse>
{
  declare readonly Parameters: Readonly<ExtractTextEntitiesRequestParameters>;

  constructor(parameters: ExtractTextEntitiesRequestParameters) {
    super("ExtractTextEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractTextEntities`;

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

  async parseResponse(response: Response): Promise<ExtractTextEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ExtractTextEntitiesResponse.fromResponse({});
    return ExtractTextEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * ExtractTextEntities response message
 */
export class ExtractTextEntitiesResponse extends OrganizationResponse {
  constructor(public result: ExtractTextEntitiesResponseData) {
    super("ExtractTextEntities");
  }

  static fromResponse(data: unknown): ExtractTextEntitiesResponse {
    return new ExtractTextEntitiesResponse(responseObject<ExtractTextEntitiesResponseData>(data));
  }
}
