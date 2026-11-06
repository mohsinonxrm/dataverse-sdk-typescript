import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CCaaS_AAAEvalsAPI request message
 *
 * Web API Action: CCaaS_AAAEvalsAPI
 */
export class CCaaS_AAAEvalsAPIRequest
  extends OrganizationRequest
  implements Executable<CCaaS_AAAEvalsAPIResponse>
{
  constructor() {
    super("CCaaS_AAAEvalsAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_AAAEvalsAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_AAAEvalsAPIResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_AAAEvalsAPIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_AAAEvalsAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_AAAEvalsAPIResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  ResponseData: string;
  StatusCode: string;
}

/**
 * CCaaS_AAAEvalsAPI response message
 *
 * `result` is the value the CCaaS_AAAEvalsAPI action returns (see {@link CCaaS_AAAEvalsAPIResult}).
 */
export class CCaaS_AAAEvalsAPIResponse extends OrganizationResponse {
  constructor(public result: CCaaS_AAAEvalsAPIResult) {
    super("CCaaS_AAAEvalsAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_AAAEvalsAPIResponse {
    return new CCaaS_AAAEvalsAPIResponse(data as CCaaS_AAAEvalsAPIResult);
  }
}
