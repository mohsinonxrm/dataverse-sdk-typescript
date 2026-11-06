import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { IsPmEnabledResponse as IsPmEnabledResponseData } from "./types/index.js";

/**
 * IsPmEnabled request message
 *
 * Web API Action: IsPmEnabled
 */
export class IsPmEnabledRequest
  extends OrganizationRequest
  implements Executable<IsPmEnabledResponse>
{
  constructor() {
    super("IsPmEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPmEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPmEnabledResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return IsPmEnabledResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * IsPmEnabled response message
 */
export class IsPmEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPmEnabledResponseData) {
    super("IsPmEnabled");
  }

  static fromResponse(data: unknown): IsPmEnabledResponse {
    return new IsPmEnabledResponse(responseObject<IsPmEnabledResponseData>(data));
  }
}
