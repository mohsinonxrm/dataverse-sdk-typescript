import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ExecuteFxExpressionResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ExecuteFxExpressionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExecuteFxExpression action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ExecuteFxExpressionResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * ExecuteFxExpression response message
 *
 * `result` is the value the ExecuteFxExpression action returns (see {@link ExecuteFxExpressionResult}).
 */
export class ExecuteFxExpressionResponse extends OrganizationResponse {
  constructor(public result: ExecuteFxExpressionResult) {
    super("ExecuteFxExpression");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExecuteFxExpressionResponse {
    return new ExecuteFxExpressionResponse((data ?? null) as ExecuteFxExpressionResult);
  }
}
