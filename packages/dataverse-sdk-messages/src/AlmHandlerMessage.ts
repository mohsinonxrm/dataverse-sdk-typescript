import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AlmHandlerResponse as AlmHandlerResponseData } from "./types/index.js";

/**
 * AlmHandler request message
 *
 * Web API Action: AlmHandler
 */
export class AlmHandlerRequest
  extends OrganizationRequest
  implements Executable<AlmHandlerResponse>
{
  constructor(
    public action: string,
    public input?: string
  ) {
    super("AlmHandler");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AlmHandler`;

    const body: Record<string, unknown> = {
      action: this.action,
      input: this.input,
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

  async parseResponse(response: Response): Promise<AlmHandlerResponse> {
    const data = await response.json();
    return AlmHandlerResponse.fromResponse(data);
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
