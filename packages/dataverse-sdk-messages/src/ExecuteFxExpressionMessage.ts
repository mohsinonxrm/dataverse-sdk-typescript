import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * ExecuteFxExpression request message
 *
 * Web API Action: ExecuteFxExpression
 */
export class ExecuteFxExpressionRequest
  extends OrganizationRequest
  implements Executable<ExecuteFxExpressionResponse>
{
  constructor(
    public expression: string,
    public inputparameters: EntityReference,
    public context: string,
    public entitylogicalname: string,
    public outputparameters: EntityReference
  ) {
    super("ExecuteFxExpression");
  }

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
    return ExecuteFxExpressionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      expression: this.expression,
      inputparameters: this.inputparameters,
      context: this.context,
      entitylogicalname: this.entitylogicalname,
      outputparameters: this.outputparameters,
    };
  }
}

/**
 * ExecuteFxExpression response message
 */
export class ExecuteFxExpressionResponse extends OrganizationResponse {
  constructor(public result: EntityReference) {
    super("ExecuteFxExpression");
  }

  static fromResponse(data: unknown): ExecuteFxExpressionResponse {
    return new ExecuteFxExpressionResponse((data as any).value);
  }
}
