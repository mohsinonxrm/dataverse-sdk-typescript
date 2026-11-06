import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from ExecuteFxExpression action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface ExecuteFxExpressionResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ExecuteFxExpressionResponse;
    return (await response.json()) as ExecuteFxExpressionResponse;
  }
}
