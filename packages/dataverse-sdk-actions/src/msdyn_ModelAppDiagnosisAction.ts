import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { appmodule } from "./types/index.js";

/**
 * Response from the msdyn_ModelAppDiagnosis action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ModelAppDiagnosisResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  RepairIssueType: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * Parameters of the msdyn_ModelAppDiagnosis action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ModelAppDiagnosisActionParameters {
  IssueType: string;
  ComponentInstance: EntityReference | EntityPayload<appmodule>;
}

/**
 * msdyn_ModelAppDiagnosis action
 *
 * Unbound action
 */
export class msdyn_ModelAppDiagnosisAction implements Executable<msdyn_ModelAppDiagnosisResponse> {
  constructor(public readonly parameters: msdyn_ModelAppDiagnosisActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppDiagnosis`;

    const body = requestBody({
      IssueType: this.parameters.IssueType,
      ComponentInstance: this.parameters.ComponentInstance,
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

  async parseResponse(response: Response): Promise<msdyn_ModelAppDiagnosisResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ModelAppDiagnosisResponse;
  }
}
