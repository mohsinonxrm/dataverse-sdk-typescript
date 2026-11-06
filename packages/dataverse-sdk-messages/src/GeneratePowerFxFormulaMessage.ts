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
    // 204 No Content is an empty result
    if (response.status === 204) return GeneratePowerFxFormulaResponse.fromResponse({});
    return GeneratePowerFxFormulaResponse.fromResponse(await response.json());
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
