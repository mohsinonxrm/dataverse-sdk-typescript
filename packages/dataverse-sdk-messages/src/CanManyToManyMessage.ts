import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CanManyToManyResponse as CanManyToManyResponseData } from "./types/index.js";

/**
 * Parameters of the CanManyToMany message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanManyToManyRequestParameters {
  EntityName: string;
}

/**
 * CanManyToMany request message
 *
 * Web API Action: CanManyToMany
 */
export class CanManyToManyRequest
  extends OrganizationRequest
  implements Executable<CanManyToManyResponse>
{
  declare readonly Parameters: Readonly<CanManyToManyRequestParameters>;

  constructor(parameters: CanManyToManyRequestParameters) {
    super("CanManyToMany", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanManyToMany`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
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

  async parseResponse(response: Response): Promise<CanManyToManyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CanManyToManyResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CanManyToMany response message
 */
export class CanManyToManyResponse extends OrganizationResponse {
  constructor(public result: CanManyToManyResponseData) {
    super("CanManyToMany");
  }

  static fromResponse(data: unknown): CanManyToManyResponse {
    return new CanManyToManyResponse(responseObject<CanManyToManyResponseData>(data));
  }
}
