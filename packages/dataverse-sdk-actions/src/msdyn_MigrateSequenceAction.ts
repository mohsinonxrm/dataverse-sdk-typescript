import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MigrateSequence action
 */
export interface msdyn_MigrateSequenceResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_MigrateSequence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateSequenceActionParameters {
  MigrationId: string;
}

/**
 * msdyn_MigrateSequence action
 *
 * Unbound action
 */
export class msdyn_MigrateSequenceAction implements Executable<msdyn_MigrateSequenceResponse> {
  constructor(public readonly parameters: msdyn_MigrateSequenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateSequence`;

    const body = requestBody({
      MigrationId: this.parameters.MigrationId,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateSequenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MigrateSequenceResponse;
    return (await response.json()) as msdyn_MigrateSequenceResponse;
  }
}
