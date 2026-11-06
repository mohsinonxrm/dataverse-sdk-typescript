import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetIoTVisualizationSummaryResponse as msdyn_GetIoTVisualizationSummaryResponseData } from "./types/index.js";

/**
 * msdyn_GetIoTVisualizationSummary request message
 *
 * Web API Action: msdyn_GetIoTVisualizationSummary
 */
export class msdyn_GetIoTVisualizationSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIoTVisualizationSummaryResponse>
{
  constructor(
    public deviceId: string,
    public configurationTypeId: string
  ) {
    super("msdyn_GetIoTVisualizationSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIoTVisualizationSummary`;

    const body: Record<string, unknown> = {
      DeviceId: this.deviceId,
      ConfigurationTypeId: this.configurationTypeId,
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

  async parseResponse(response: Response): Promise<msdyn_GetIoTVisualizationSummaryResponse> {
    const data = await response.json();
    return msdyn_GetIoTVisualizationSummaryResponse.fromResponse(data);
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
