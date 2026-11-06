import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the GeneratePowerFxFormula action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GeneratePowerFxFormulaResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the GeneratePowerFxFormula action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GeneratePowerFxFormulaActionParameters {
  ConnectionReference: EntityReference | AnyEntityPayload;
  ParameterValues?: EntityReference | AnyEntityPayload;
  OperationId: string;
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
      ConnectionReference: this.parameters.ConnectionReference,
      ParameterValues: this.parameters.ParameterValues,
      OperationId: this.parameters.OperationId,
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: GeneratePowerFxFormulaResponse }).value;
  }
}
