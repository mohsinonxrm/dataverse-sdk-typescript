import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_MigrateSequence action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_MigrateSequenceResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_MigrateSequenceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
