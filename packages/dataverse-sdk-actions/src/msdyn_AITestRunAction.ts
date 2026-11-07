import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_AITestRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AITestRunResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * Parameters of the msdyn_AITestRun action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AITestRunActionParameters {
  request: string;
}

/**
 * msdyn_AITestRun action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_aitestcase)
 *
 * The first argument is the id of the msdyn_aitestcase record to call it on.
 */
export class msdyn_AITestRunAction implements Executable<msdyn_AITestRunResponse> {
  constructor(
    public readonly msdyn_aitestcaseId: string,
    public readonly parameters: msdyn_AITestRunActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${odataLiteral.guid(this.msdyn_aitestcaseId)})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

    const body = requestBody({
      request: this.parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_AITestRunResponse;
  }
}
