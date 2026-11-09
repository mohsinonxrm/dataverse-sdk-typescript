import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GeneratePlatformSummaryConfigRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GeneratePlatformSummaryConfigRecordsResponse {
  "@odata.context"?: string;
  Result: string;
}

/**
 * Parameters of the msdyn_GeneratePlatformSummaryConfigRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeneratePlatformSummaryConfigRecordsActionParameters {
  EntityLogicalName?: string;
}

/**
 * msdyn_GeneratePlatformSummaryConfigRecords action
 *
 * Unbound action
 */
export class msdyn_GeneratePlatformSummaryConfigRecordsAction implements Executable<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
  constructor(
    public readonly parameters: msdyn_GeneratePlatformSummaryConfigRecordsActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummaryConfigRecords`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GeneratePlatformSummaryConfigRecordsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GeneratePlatformSummaryConfigRecordsResponse;
  }
}
