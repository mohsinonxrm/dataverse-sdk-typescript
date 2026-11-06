import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { IsPaiEnabledResponse as IsPaiEnabledResponseData } from "./types/index.js";

/**
 * IsPaiEnabled request message
 *
 * Web API Action: IsPaiEnabled
 */
export class IsPaiEnabledRequest
  extends OrganizationRequest
  implements Executable<IsPaiEnabledResponse>
{
  constructor() {
    super("IsPaiEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/IsPaiEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPaiEnabledResponse> {
    const data = await response.json();
    return IsPaiEnabledResponse.fromResponse(data);
  }
}

/**
 * IsPaiEnabled response message
 */
export class IsPaiEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPaiEnabledResponseData) {
    super("IsPaiEnabled");
  }

  static fromResponse(data: unknown): IsPaiEnabledResponse {
    return new IsPaiEnabledResponse(responseObject<IsPaiEnabledResponseData>(data));
  }
}
