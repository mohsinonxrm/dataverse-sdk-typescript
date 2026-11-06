import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RecordEmailUsageResponse as msdyn_RecordEmailUsageResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RecordEmailUsage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecordEmailUsageRequestParameters {
  AdditionalParameters?: string;
  ScenarioName?: string;
  CorrelationId?: string;
}

/**
 * msdyn_RecordEmailUsage request message
 *
 * Web API Action: msdyn_RecordEmailUsage
 */
export class msdyn_RecordEmailUsageRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecordEmailUsageResponse>
{
  declare readonly Parameters: Readonly<msdyn_RecordEmailUsageRequestParameters>;

  constructor(parameters: msdyn_RecordEmailUsageRequestParameters = {}) {
    super("msdyn_RecordEmailUsage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecordEmailUsage`;

    const body = requestBody({
      AdditionalParameters: this.Parameters.AdditionalParameters,
      ScenarioName: this.Parameters.ScenarioName,
      CorrelationId: this.Parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<msdyn_RecordEmailUsageResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RecordEmailUsageResponse.fromResponse({});
    return msdyn_RecordEmailUsageResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RecordEmailUsage response message
 */
export class msdyn_RecordEmailUsageResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecordEmailUsageResponseData) {
    super("msdyn_RecordEmailUsage");
  }

  static fromResponse(data: unknown): msdyn_RecordEmailUsageResponse {
    return new msdyn_RecordEmailUsageResponse(
      responseObject<msdyn_RecordEmailUsageResponseData>(data)
    );
  }
}
