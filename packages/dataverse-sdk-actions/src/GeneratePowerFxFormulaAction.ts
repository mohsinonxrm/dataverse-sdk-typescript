import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from GeneratePowerFxFormula action
 */
export interface GeneratePowerFxFormulaResponse {
  value: EntityReference[];
}

/**
 * Parameters of the GeneratePowerFxFormula action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GeneratePowerFxFormulaActionParameters {
  OperationId: string;
  ParameterValues?: EntityReference | AnyEntityPayload;
  ConnectionReference: EntityReference | AnyEntityPayload;
}

/**
 * GeneratePowerFxFormula action
 *
 * Unbound action
 */
export class GeneratePowerFxFormulaAction implements Executable<GeneratePowerFxFormulaResponse> {
  constructor(public readonly parameters: GeneratePowerFxFormulaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GeneratePowerFxFormula`;

    const body = requestBody({
      OperationId: this.parameters.OperationId,
      ParameterValues: this.parameters.ParameterValues,
      ConnectionReference: this.parameters.ConnectionReference,
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

  async parseResponse(response: Response): Promise<GeneratePowerFxFormulaResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as GeneratePowerFxFormulaResponse;
  }
}
