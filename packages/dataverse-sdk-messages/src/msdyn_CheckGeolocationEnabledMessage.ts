import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckGeolocationEnabledResponse as msdyn_CheckGeolocationEnabledResponseData } from "./types/index.js";

/**
 * msdyn_CheckGeolocationEnabled request message
 *
 * Web API Action: msdyn_CheckGeolocationEnabled
 */
export class msdyn_CheckGeolocationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckGeolocationEnabledResponse>
{
  constructor(
    public version: string,
    public noCache: boolean
  ) {
    super("msdyn_CheckGeolocationEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckGeolocationEnabled`;

    const body: Record<string, unknown> = {
      Version: this.version,
      NoCache: this.noCache,
    };

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
    const data = await response.json();
    return msdyn_CheckGeolocationEnabledResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckGeolocationEnabled response message
 */
export class msdyn_CheckGeolocationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckGeolocationEnabledResponseData) {
    super("msdyn_CheckGeolocationEnabled");
  }

  static fromResponse(data: unknown): msdyn_CheckGeolocationEnabledResponse {
    return new msdyn_CheckGeolocationEnabledResponse(
      responseObject<msdyn_CheckGeolocationEnabledResponseData>(data)
    );
  }
}
