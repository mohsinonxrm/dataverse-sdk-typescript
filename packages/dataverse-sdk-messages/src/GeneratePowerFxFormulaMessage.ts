import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the GeneratePowerFxFormula message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GeneratePowerFxFormulaRequestParameters {
  OperationId: string;
  ParameterValues?: EntityReference | AnyEntityPayload;
  ConnectionReference: EntityReference | AnyEntityPayload;
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
      OperationId: this.Parameters.OperationId,
      ParameterValues: this.Parameters.ParameterValues,
      ConnectionReference: this.Parameters.ConnectionReference,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GeneratePowerFxFormulaResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GeneratePowerFxFormula response message
 */
export class GeneratePowerFxFormulaResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("GeneratePowerFxFormula");
  }

  static fromResponse(data: unknown): GeneratePowerFxFormulaResponse {
    return new GeneratePowerFxFormulaResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
