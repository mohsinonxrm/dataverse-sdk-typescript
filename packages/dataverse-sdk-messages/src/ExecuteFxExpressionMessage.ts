import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the ExecuteFxExpression message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExecuteFxExpressionRequestParameters {
  outputparameters?: EntityReference | AnyEntityPayload;
  inputparameters?: EntityReference | AnyEntityPayload;
  context?: string;
  entitylogicalname?: string;
  expression: string;
}

/**
 * ExecuteFxExpression request message
 *
 * Web API Action: ExecuteFxExpression
 */
export class ExecuteFxExpressionRequest
  extends OrganizationRequest
  implements Executable<ExecuteFxExpressionResponse>
{
  declare readonly Parameters: Readonly<ExecuteFxExpressionRequestParameters>;

  constructor(parameters: ExecuteFxExpressionRequestParameters) {
    super("ExecuteFxExpression", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExecuteFxExpression`;

    const body = requestBody({
      outputparameters: this.Parameters.outputparameters,
      inputparameters: this.Parameters.inputparameters,
      context: this.Parameters.context,
      entitylogicalname: this.Parameters.entitylogicalname,
      expression: this.Parameters.expression,
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
    if (response.status === 204) return ExecuteFxExpressionResponse.fromResponse({});
    return ExecuteFxExpressionResponse.fromResponse(await response.json());
  }
}

/**
 * ExecuteFxExpression response message
 */
export class ExecuteFxExpressionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("ExecuteFxExpression");
  }

  static fromResponse(data: unknown): ExecuteFxExpressionResponse {
    return new ExecuteFxExpressionResponse(responseObject<Record<string, unknown>>(data));
  }
}
