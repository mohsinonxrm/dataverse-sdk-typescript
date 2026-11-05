import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from GeneratePowerFxFormula action
 */
export interface GeneratePowerFxFormulaResponse {
  value: EntityReference[];
}

/**
 * GeneratePowerFxFormula action
 *
 * Unbound action
 */
export class GeneratePowerFxFormulaAction implements Executable<GeneratePowerFxFormulaResponse> {
  constructor(
    public readonly operationId: string,
    public readonly parameterValues: EntityReference,
    public readonly connectionReference: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GeneratePowerFxFormula`;

    const body: Record<string, unknown> = {
      OperationId: this.operationId,
      ParameterValues: this.parameterValues,
      ConnectionReference: this.connectionReference,
    };

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
    const data = await response.json();
    return data as GeneratePowerFxFormulaResponse;
  }
}
