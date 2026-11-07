import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the GeneratePowerFxFormula message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GeneratePowerFxFormulaRequestParameters {
  ConnectionReference: EntityReference | AnyEntityPayload;
  ParameterValues?: EntityReference | AnyEntityPayload;
  OperationId: string;
}

/**
 * GeneratePowerFxFormula request message
 *
 * Web API Action: GeneratePowerFxFormula
 */
export class GeneratePowerFxFormulaRequest
  extends OrganizationRequest
  implements Executable<GeneratePowerFxFormulaResponse>
{
  declare readonly Parameters: Readonly<GeneratePowerFxFormulaRequestParameters>;

  constructor(parameters: GeneratePowerFxFormulaRequestParameters) {
    super("GeneratePowerFxFormula", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GeneratePowerFxFormula`;

    const body = requestBody({
      ConnectionReference: this.Parameters.ConnectionReference,
      ParameterValues: this.Parameters.ParameterValues,
      OperationId: this.Parameters.OperationId,
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
    if (response.status === 204) return GeneratePowerFxFormulaResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return GeneratePowerFxFormulaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GeneratePowerFxFormula action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GeneratePowerFxFormulaResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * GeneratePowerFxFormula response message
 *
 * `result` is the value the GeneratePowerFxFormula action returns (see {@link GeneratePowerFxFormulaResult}).
 */
export class GeneratePowerFxFormulaResponse extends OrganizationResponse {
  constructor(public result: GeneratePowerFxFormulaResult) {
    super("GeneratePowerFxFormula");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GeneratePowerFxFormulaResponse {
    return new GeneratePowerFxFormulaResponse(
      data === undefined ? [] : (data as { value: GeneratePowerFxFormulaResult }).value
    );
  }
}
