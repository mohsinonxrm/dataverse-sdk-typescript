import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_getqaaperformancemetricsResponse as msdyn_getqaaperformancemetricsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_getqaaperformancemetrics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getqaaperformancemetricsRequestParameters {
  Window?: string;
}

/**
 * msdyn_getqaaperformancemetrics request message
 *
 * Web API Action: msdyn_getqaaperformancemetrics
 */
export class msdyn_getqaaperformancemetricsRequest
  extends OrganizationRequest
  implements Executable<msdyn_getqaaperformancemetricsResponse>
{
  declare readonly Parameters: Readonly<msdyn_getqaaperformancemetricsRequestParameters>;

  constructor(parameters: msdyn_getqaaperformancemetricsRequestParameters = {}) {
    super("msdyn_getqaaperformancemetrics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getqaaperformancemetrics`;

    const body = requestBody({
      Window: this.Parameters.Window,
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

  async parseResponse(response: Response): Promise<msdyn_getqaaperformancemetricsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_getqaaperformancemetricsResponse.fromResponse({});
    return msdyn_getqaaperformancemetricsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_getqaaperformancemetrics response message
 */
export class msdyn_getqaaperformancemetricsResponse extends OrganizationResponse {
  constructor(public result: msdyn_getqaaperformancemetricsResponseData) {
    super("msdyn_getqaaperformancemetrics");
  }

  static fromResponse(data: unknown): msdyn_getqaaperformancemetricsResponse {
    return new msdyn_getqaaperformancemetricsResponse(
      responseObject<msdyn_getqaaperformancemetricsResponseData>(data)
    );
  }
}
