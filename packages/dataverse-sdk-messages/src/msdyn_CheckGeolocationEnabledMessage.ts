import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckGeolocationEnabledResponse as msdyn_CheckGeolocationEnabledResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckGeolocationEnabledResponse.fromResponse({});
    return msdyn_CheckGeolocationEnabledResponse.fromResponse(await response.json());
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
