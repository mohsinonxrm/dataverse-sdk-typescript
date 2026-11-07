import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the ExecuteFxExpression action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteFxExpressionResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Parameters of the ExecuteFxExpression action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteFxExpressionActionParameters {
  outputparameters?: EntityReference | AnyEntityPayload;
  inputparameters?: EntityReference | AnyEntityPayload;
  context?: string;
  entitylogicalname?: string;
  expression: string;
}

/**
 * ExecuteFxExpression action
 *
 * Unbound action
 */
export class ExecuteFxExpressionAction implements Executable<ExecuteFxExpressionResponse> {
  constructor(public readonly parameters: ExecuteFxExpressionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExecuteFxExpression`;

    const body = requestBody({
      outputparameters: this.parameters.outputparameters,
      inputparameters: this.parameters.inputparameters,
      context: this.parameters.context,
      entitylogicalname: this.parameters.entitylogicalname,
      expression: this.parameters.expression,
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

  async parseResponse(response: Response): Promise<ExecuteFxExpressionResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as ExecuteFxExpressionResponse;
  }
}
