import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesInsightsTpsPackage action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesInsightsTpsPackageResponse = void;

/**
 * Parameters of the msdyn_SalesInsightsTpsPackage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsTpsPackageActionParameters {
  skipInstall: string;
}

/**
 * msdyn_SalesInsightsTpsPackage action
 *
 * Unbound action
 */
export class msdyn_SalesInsightsTpsPackageAction implements Executable<msdyn_SalesInsightsTpsPackageResponse> {
  constructor(public readonly parameters: msdyn_SalesInsightsTpsPackageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsTpsPackage`;

    const body = requestBody({
      skipInstall: this.parameters.skipInstall,
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

  parseResponse(_response: Response): Promise<msdyn_SalesInsightsTpsPackageResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
