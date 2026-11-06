import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MigrateArc action
 */
export interface msdyn_MigrateArcResponse {
  OutputString: string;
  Exception: string;
}

/**
 * Parameters of the msdyn_MigrateArc action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateArcActionParameters {
  ArcMigrationRequest: string;
}

/**
 * msdyn_MigrateArc action
 *
 * Unbound action
 */
export class msdyn_MigrateArcAction implements Executable<msdyn_MigrateArcResponse> {
  constructor(public readonly parameters: msdyn_MigrateArcActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateArc`;

    const body = requestBody({
      ArcMigrationRequest: this.parameters.ArcMigrationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateArcResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_MigrateArcResponse;
  }
}
