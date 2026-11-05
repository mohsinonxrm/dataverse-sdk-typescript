import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { GetNextAutoNumberValueResponse as GetNextAutoNumberValueResponseData } from "./types/index.js";

/**
 * GetNextAutoNumberValue request message
 *
 * Web API Action: GetNextAutoNumberValue
 */
export class GetNextAutoNumberValueRequest
  extends OrganizationRequest
  implements Executable<GetNextAutoNumberValueResponse>
{
  constructor(
    public entityName: string,
    public attributeName: string
  ) {
    super("GetNextAutoNumberValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

    const body: Record<string, unknown> = {
      EntityName: this.entityName,
      AttributeName: this.attributeName,
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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    const data = await response.json();
    return GetNextAutoNumberValueResponse.fromResponse(data);
  }
}

/**
 * GetNextAutoNumberValue response message
 */
export class GetNextAutoNumberValueResponse extends OrganizationResponse {
  constructor(public result: GetNextAutoNumberValueResponseData) {
    super("GetNextAutoNumberValue");
  }

  static fromResponse(data: unknown): GetNextAutoNumberValueResponse {
    return new GetNextAutoNumberValueResponse(
      responseObject<GetNextAutoNumberValueResponseData>(data)
    );
  }
}
