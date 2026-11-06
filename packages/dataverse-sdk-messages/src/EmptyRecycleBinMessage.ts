import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EmptyRecycleBinResponse as EmptyRecycleBinResponseData } from "./types/index.js";

/**
 * EmptyRecycleBin request message
 *
 * Web API Action: EmptyRecycleBin
 */
export class EmptyRecycleBinRequest
  extends OrganizationRequest
  implements Executable<EmptyRecycleBinResponse>
{
  constructor() {
    super("EmptyRecycleBin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/EmptyRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<EmptyRecycleBinResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return EmptyRecycleBinResponse.fromResponse({});
    return EmptyRecycleBinResponse.fromResponse(await response.json());
  }
}

/**
 * EmptyRecycleBin response message
 */
export class EmptyRecycleBinResponse extends OrganizationResponse {
  constructor(public result: EmptyRecycleBinResponseData) {
    super("EmptyRecycleBin");
  }

  static fromResponse(data: unknown): EmptyRecycleBinResponse {
    return new EmptyRecycleBinResponse(responseObject<EmptyRecycleBinResponseData>(data));
  }
}
