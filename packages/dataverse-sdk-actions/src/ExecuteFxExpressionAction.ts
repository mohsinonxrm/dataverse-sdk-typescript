import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * ExecuteFxExpression action
 *
 * Unbound action
 */
export class ExecuteFxExpressionAction implements Executable<ExecuteFxExpressionResponse> {
  constructor(
    public readonly expression: string,
    public readonly inputparameters?: EntityReference | AnyEntityPayload,
    public readonly context?: string,
    public readonly entitylogicalname?: string,
    public readonly outputparameters?: EntityReference | AnyEntityPayload
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
