import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { GetNextAutoNumberValueResponse as GetNextAutoNumberValueResponseData } from "./types/index.js";

/**
 * Parameters of the GetNextAutoNumberValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetNextAutoNumberValueRequestParameters {
  EntityName: string;
  AttributeName: string;
}

/**
 * GetNextAutoNumberValue request message
 *
 * Web API Action: GetNextAutoNumberValue
 */
export class GetNextAutoNumberValueRequest
  extends OrganizationRequest
  implements Executable<GetNextAutoNumberValueResponse>
{
  declare readonly Parameters: Readonly<GetNextAutoNumberValueRequestParameters>;

  constructor(parameters: GetNextAutoNumberValueRequestParameters) {
    super("GetNextAutoNumberValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetNextAutoNumberValue`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      AttributeName: this.Parameters.AttributeName,
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

  async parseResponse(response: Response): Promise<GetNextAutoNumberValueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetNextAutoNumberValueResponse.fromResponse({});
    return GetNextAutoNumberValueResponse.fromResponse(await response.json());
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
