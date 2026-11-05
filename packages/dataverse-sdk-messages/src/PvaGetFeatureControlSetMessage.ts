import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PvaGetFeatureControlSetResponse as PvaGetFeatureControlSetResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetFeatureControlSetResponse> {
    const data = await response.json();
    return PvaGetFeatureControlSetResponse.fromResponse(data);
  }
}

/**
 * PvaGetFeatureControlSet response message
 */
export class PvaGetFeatureControlSetResponse extends OrganizationResponse {
  constructor(public result: PvaGetFeatureControlSetResponseData) {
    super("PvaGetFeatureControlSet");
  }

  static fromResponse(data: unknown): PvaGetFeatureControlSetResponse {
    return new PvaGetFeatureControlSetResponse(
      responseObject<PvaGetFeatureControlSetResponseData>(data)
    );
  }
}
