import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetIoTVisualizationSummaryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetIoTVisualizationSummary action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetIoTVisualizationSummaryResult {
  "@odata.context"?: string;
  SummaryOutput: string;
}

/**
 * msdyn_GetIoTVisualizationSummary response message
 *
 * `result` is the value the msdyn_GetIoTVisualizationSummary action returns (see {@link msdyn_GetIoTVisualizationSummaryResult}).
 */
export class msdyn_GetIoTVisualizationSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIoTVisualizationSummaryResult) {
    super("msdyn_GetIoTVisualizationSummary");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetIoTVisualizationSummaryResponse {
    return new msdyn_GetIoTVisualizationSummaryResponse(
      data as msdyn_GetIoTVisualizationSummaryResult
    );
  }
}
