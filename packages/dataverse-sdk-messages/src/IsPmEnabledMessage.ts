import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<IsPmEnabledResponse> {
    const data = await response.json();
    return IsPmEnabledResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * IsPmEnabled response message
 */
export class IsPmEnabledResponse extends OrganizationResponse {
  constructor(public result: IsPmEnabledResponse) {
    super("IsPmEnabled");
  }

  static fromResponse(data: unknown): IsPmEnabledResponse {
    return new IsPmEnabledResponse((data as any).value);
  }
}
