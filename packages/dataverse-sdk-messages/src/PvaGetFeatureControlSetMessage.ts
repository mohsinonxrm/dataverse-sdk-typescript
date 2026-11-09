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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetFeatureControlSetResponse> {
    // The body is the complex value, with its @odata.context
    return PvaGetFeatureControlSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaGetFeatureControlSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetFeatureControlSetResult {
  "@odata.context"?: string;
  FeatureControlSet: string;
}

/**
 * PvaGetFeatureControlSet response message
 *
 * `result` is the value the PvaGetFeatureControlSet action returns (see {@link PvaGetFeatureControlSetResult}).
 */
export class PvaGetFeatureControlSetResponse extends OrganizationResponse {
  constructor(public result: PvaGetFeatureControlSetResult) {
    super("PvaGetFeatureControlSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaGetFeatureControlSetResponse {
    return new PvaGetFeatureControlSetResponse(data as PvaGetFeatureControlSetResult);
  }
}
