import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckGeolocationEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckGeolocationEnabledRequestParameters {
  Version?: string;
  NoCache?: boolean;
}

/**
 * msdyn_CheckGeolocationEnabled request message
 *
 * Web API Action: msdyn_CheckGeolocationEnabled
 */
export class msdyn_CheckGeolocationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckGeolocationEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckGeolocationEnabledRequestParameters>;

  constructor(parameters: msdyn_CheckGeolocationEnabledRequestParameters = {}) {
    super("msdyn_CheckGeolocationEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckGeolocationEnabled`;

    const body = requestBody({
      Version: this.Parameters.Version,
      NoCache: this.Parameters.NoCache,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckGeolocationEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckGeolocationEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckGeolocationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckGeolocationEnabledResult {
  "@odata.context"?: string;
  IsEnabled: boolean;
}

/**
 * msdyn_CheckGeolocationEnabled response message
 *
 * `result` is the value the msdyn_CheckGeolocationEnabled action returns (see {@link msdyn_CheckGeolocationEnabledResult}).
 */
export class msdyn_CheckGeolocationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckGeolocationEnabledResult) {
    super("msdyn_CheckGeolocationEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckGeolocationEnabledResponse {
    return new msdyn_CheckGeolocationEnabledResponse(data as msdyn_CheckGeolocationEnabledResult);
  }
}
