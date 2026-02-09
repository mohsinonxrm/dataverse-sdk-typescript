import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaGetFeatureControlSet request message
 *
 * Web API Action: PvaGetFeatureControlSet
 */
export class PvaGetFeatureControlSetRequest
  extends OrganizationRequest
  implements Executable<PvaGetFeatureControlSetResponse>
{
  constructor() {
    super("PvaGetFeatureControlSet");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetFeatureControlSet`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetFeatureControlSetResponse> {
    const data = await response.json();
    return PvaGetFeatureControlSetResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * PvaGetFeatureControlSet response message
 */
export class PvaGetFeatureControlSetResponse extends OrganizationResponse {
  constructor(public result: PvaGetFeatureControlSetResponse) {
    super("PvaGetFeatureControlSet");
  }

  static fromResponse(data: unknown): PvaGetFeatureControlSetResponse {
    return new PvaGetFeatureControlSetResponse((data as any).value);
  }
}
