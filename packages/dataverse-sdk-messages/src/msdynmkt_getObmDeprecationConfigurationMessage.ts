import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_getObmDeprecationConfiguration request message
 *
 * Web API Action: msdynmkt_getObmDeprecationConfiguration
 */
export class msdynmkt_getObmDeprecationConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getObmDeprecationConfigurationResponse>
{
  constructor() {
    super("msdynmkt_getObmDeprecationConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getObmDeprecationConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_getObmDeprecationConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_getObmDeprecationConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_getObmDeprecationConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getObmDeprecationConfigurationResult {
  "@odata.context"?: string;
  msdynmkt_obmDeprecationConfiguration: string;
}

/**
 * msdynmkt_getObmDeprecationConfiguration response message
 *
 * `result` is the value the msdynmkt_getObmDeprecationConfiguration action returns (see {@link msdynmkt_getObmDeprecationConfigurationResult}).
 */
export class msdynmkt_getObmDeprecationConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getObmDeprecationConfigurationResult) {
    super("msdynmkt_getObmDeprecationConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_getObmDeprecationConfigurationResponse {
    return new msdynmkt_getObmDeprecationConfigurationResponse(
      data as msdynmkt_getObmDeprecationConfigurationResult
    );
  }
}
