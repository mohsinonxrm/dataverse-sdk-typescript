import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AlmHandlerResponse as AlmHandlerResponseData } from "./types/index.js";

/**
 * Parameters of the AlmHandler message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AlmHandlerRequestParameters {
  action: string;
  input?: string;
}

/**
 * AlmHandler request message
 *
 * Web API Action: AlmHandler
 */
export class AlmHandlerRequest
  extends OrganizationRequest
  implements Executable<AlmHandlerResponse>
{
  declare readonly Parameters: Readonly<AlmHandlerRequestParameters>;

  constructor(parameters: AlmHandlerRequestParameters) {
    super("AlmHandler", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AlmHandler`;

    const body = requestBody({
      action: this.Parameters.action,
      input: this.Parameters.input,
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

  async parseResponse(response: Response): Promise<AlmHandlerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AlmHandlerResponse.fromResponse({});
    return AlmHandlerResponse.fromResponse(await response.json());
  }
}

/**
 * AlmHandler response message
 */
export class AlmHandlerResponse extends OrganizationResponse {
  constructor(public result: AlmHandlerResponseData) {
    super("AlmHandler");
  }

  static fromResponse(data: unknown): AlmHandlerResponse {
    return new AlmHandlerResponse(responseObject<AlmHandlerResponseData>(data));
  }
}
