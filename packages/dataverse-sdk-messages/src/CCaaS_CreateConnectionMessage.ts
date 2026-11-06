import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_CreateConnectionResponse as CCaaS_CreateConnectionResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_CreateConnection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateConnectionRequestParameters {
  ClientSessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CreateConnection request message
 *
 * Web API Action: CCaaS_CreateConnection
 */
export class CCaaS_CreateConnectionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateConnectionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateConnectionRequestParameters>;

  constructor(parameters: CCaaS_CreateConnectionRequestParameters) {
    super("CCaaS_CreateConnection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateConnection`;

    const body = requestBody({
      ClientSessionId: this.Parameters.ClientSessionId,
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateConnectionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_CreateConnectionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CCaaS_CreateConnection response message
 */
export class CCaaS_CreateConnectionResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateConnectionResponseData) {
    super("CCaaS_CreateConnection");
  }

  static fromResponse(data: unknown): CCaaS_CreateConnectionResponse {
    return new CCaaS_CreateConnectionResponse(
      responseObject<CCaaS_CreateConnectionResponseData>(data)
    );
  }
}
