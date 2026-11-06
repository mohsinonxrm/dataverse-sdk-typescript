import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CCaaS_CreateConnectionResponse as CCaaS_CreateConnectionResponseData } from "./types/index.js";

/**
 * CCaaS_CreateConnection request message
 *
 * Web API Action: CCaaS_CreateConnection
 */
export class CCaaS_CreateConnectionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateConnectionResponse>
{
  constructor(
    public clientSessionId: string,
    public apiVersion: string
  ) {
    super("CCaaS_CreateConnection");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateConnection`;

    const body: Record<string, unknown> = {
      ClientSessionId: this.clientSessionId,
      ApiVersion: this.apiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateConnectionResponse> {
    const data = await response.json();
    return CCaaS_CreateConnectionResponse.fromResponse(data);
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
