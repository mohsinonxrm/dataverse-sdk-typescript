import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPaiEnabledResponse> {
    const data = await response.json();
    return IsPaiEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * IsPaiEnabled response message
 */
export class IsPaiEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPaiEnabledResponse) {
    super("IsPaiEnabled");
  }

  static fromResponse(data: unknown): IsPaiEnabledResponse {
    return new IsPaiEnabledResponse((data as any).value);
  }
}
