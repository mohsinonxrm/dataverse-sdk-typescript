import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RecordEmailUsageResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RecordEmailUsage action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RecordEmailUsageResult {
  "@odata.context"?: string;
  Success: boolean;
}

/**
 * msdyn_RecordEmailUsage response message
 *
 * `result` is the value the msdyn_RecordEmailUsage action returns (see {@link msdyn_RecordEmailUsageResult}).
 */
export class msdyn_RecordEmailUsageResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecordEmailUsageResult) {
    super("msdyn_RecordEmailUsage");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RecordEmailUsageResponse {
    return new msdyn_RecordEmailUsageResponse(data as msdyn_RecordEmailUsageResult);
  }
}
