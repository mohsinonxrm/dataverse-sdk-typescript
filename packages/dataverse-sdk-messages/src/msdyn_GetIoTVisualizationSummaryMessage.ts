import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetIoTVisualizationSummaryResponse as msdyn_GetIoTVisualizationSummaryResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetIoTVisualizationSummary message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIoTVisualizationSummaryRequestParameters {
  DeviceId: string;
  ConfigurationTypeId: string;
}

/**
 * msdyn_GetIoTVisualizationSummary request message
 *
 * Web API Action: msdyn_GetIoTVisualizationSummary
 */
export class msdyn_GetIoTVisualizationSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTVisualizationSummaryResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIoTVisualizationSummaryRequestParameters>;

  constructor(parameters: msdyn_GetIoTVisualizationSummaryRequestParameters) {
    super("msdyn_GetIoTVisualizationSummary", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTVisualizationSummary`;

    const body = requestBody({
      DeviceId: this.Parameters.DeviceId,
      ConfigurationTypeId: this.Parameters.ConfigurationTypeId,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTVisualizationSummaryResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetIoTVisualizationSummaryResponse.fromResponse({});
    return msdyn_GetIoTVisualizationSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetIoTVisualizationSummary response message
 */
export class msdyn_GetIoTVisualizationSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTVisualizationSummaryResponseData) {
    super("msdyn_GetIoTVisualizationSummary");
  }

  static fromResponse(data: unknown): msdyn_GetIoTVisualizationSummaryResponse {
    return new msdyn_GetIoTVisualizationSummaryResponse(
      responseObject<msdyn_GetIoTVisualizationSummaryResponseData>(data)
    );
  }
}
