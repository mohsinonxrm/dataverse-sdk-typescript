import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_EmailClassificationCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EmailClassificationCustomActionResponse {
  "@odata.context"?: string;
  emailclassificationResponse: string;
  matchedCategoryId: string;
  matchedScopeRuleId: string;
  status: string;
}

/**
 * Parameters of the msdyn_EmailClassificationCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EmailClassificationCustomActionActionParameters {
  emailId: string;
  additionalInfo?: string;
  doRuleEvaluation: boolean;
  isSimulationMode?: boolean;
}

/**
 * msdyn_EmailClassificationCustomAction action
 *
 * Unbound action
 */
export class msdyn_EmailClassificationCustomActionAction implements Executable<msdyn_EmailClassificationCustomActionResponse> {
  constructor(public readonly parameters: msdyn_EmailClassificationCustomActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailClassificationCustomAction`;

    const body = requestBody({
      emailId: this.parameters.emailId,
      additionalInfo: this.parameters.additionalInfo,
      doRuleEvaluation: this.parameters.doRuleEvaluation,
      isSimulationMode: this.parameters.isSimulationMode,
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

  async parseResponse(response: Response): Promise<msdyn_EmailClassificationCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EmailClassificationCustomActionResponse;
  }
}
