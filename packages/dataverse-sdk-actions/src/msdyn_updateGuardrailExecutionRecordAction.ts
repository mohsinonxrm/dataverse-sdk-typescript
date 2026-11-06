import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_updateGuardrailExecutionRecord action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_updateGuardrailExecutionRecordResponse = void;

/**
 * Parameters of the msdyn_updateGuardrailExecutionRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateGuardrailExecutionRecordActionParameters {
  msdyn_objectid: string;
  msdyn_guardrailexecutioninfoids?: string;
  msdyn_guardrail_runid?: string;
}

/**
 * msdyn_updateGuardrailExecutionRecord action
 *
 * Unbound action
 */
export class msdyn_updateGuardrailExecutionRecordAction implements Executable<msdyn_updateGuardrailExecutionRecordResponse> {
  constructor(public readonly parameters: msdyn_updateGuardrailExecutionRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateGuardrailExecutionRecord`;

    const body = requestBody({
      msdyn_objectid: this.parameters.msdyn_objectid,
      msdyn_guardrailexecutioninfoids: this.parameters.msdyn_guardrailexecutioninfoids,
      msdyn_guardrail_runid: this.parameters.msdyn_guardrail_runid,
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

  parseResponse(_response: Response): Promise<msdyn_updateGuardrailExecutionRecordResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
