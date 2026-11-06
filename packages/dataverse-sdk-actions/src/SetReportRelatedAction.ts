import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SetReportRelated action
 */
export interface SetReportRelatedResponse {
  // No content returned
}

/**
 * Parameters of the SetReportRelated action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetReportRelatedActionParameters {
  ReportId: string;
  Entities: number[];
  Categories: number[];
  Visibility: number[];
}

/**
 * SetReportRelated action
 *
 * Unbound action
 */
export class SetReportRelatedAction implements Executable<SetReportRelatedResponse> {
  constructor(public readonly parameters: SetReportRelatedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetReportRelated`;

    const body = requestBody({
      ReportId: this.parameters.ReportId,
      Entities: this.parameters.Entities,
      Categories: this.parameters.Categories,
      Visibility: this.parameters.Visibility,
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

  async parseResponse(response: Response): Promise<SetReportRelatedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SetReportRelatedResponse;
    return (await response.json()) as SetReportRelatedResponse;
  }
}
