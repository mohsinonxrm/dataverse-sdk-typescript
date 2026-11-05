import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from ExecuteFxExpression action
 */
export interface ExecuteFxExpressionResponse {
  value: EntityReference;
}

/**
 * ExecuteFxExpression action
 *
 * Unbound action
 */
export class ExecuteFxExpressionAction implements Executable<ExecuteFxExpressionResponse> {
  constructor(
    public readonly expression: string,
    public readonly inputparameters: EntityReference,
    public readonly context: string,
    public readonly entitylogicalname: string,
    public readonly outputparameters: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExecuteFxExpression`;

    const body: Record<string, unknown> = {
      expression: this.expression,
      inputparameters: this.inputparameters,
      context: this.context,
      entitylogicalname: this.entitylogicalname,
      outputparameters: this.outputparameters,
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

  async parseResponse(response: Response): Promise<ExecuteFxExpressionResponse> {
    const data = await response.json();
    return data as ExecuteFxExpressionResponse;
  }
}
