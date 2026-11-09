import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_updateGuardrailExecutionSendEmailFlag action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_updateGuardrailExecutionSendEmailFlagResponse = void;

/**
 * Parameters of the msdyn_updateGuardrailExecutionSendEmailFlag action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateGuardrailExecutionSendEmailFlagActionParameters {
  msdyn_guardrailexecutioninfoids: string;
}

/**
 * msdyn_updateGuardrailExecutionSendEmailFlag action
 *
 * Unbound action
 */
export class msdyn_updateGuardrailExecutionSendEmailFlagAction implements Executable<msdyn_updateGuardrailExecutionSendEmailFlagResponse> {
  constructor(
    public readonly parameters: msdyn_updateGuardrailExecutionSendEmailFlagActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateGuardrailExecutionSendEmailFlag`;

    const body = requestBody({
      msdyn_guardrailexecutioninfoids: this.parameters.msdyn_guardrailexecutioninfoids,
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

  parseResponse(_response: Response): Promise<msdyn_updateGuardrailExecutionSendEmailFlagResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
