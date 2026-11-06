import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * GeneratePowerFxFormula request message
 *
 * Web API Action: GeneratePowerFxFormula
 */
export class GeneratePowerFxFormulaRequest
  extends OrganizationRequest
  implements Executable<GeneratePowerFxFormulaResponse>
{
  constructor(
    public operationId: string,
    public parameterValues: EntityReference | AnyEntityPayload | undefined,
    public connectionReference: EntityReference | AnyEntityPayload
  ) {
    super("GeneratePowerFxFormula");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GeneratePowerFxFormula`;

    const body: Record<string, unknown> = {
      OperationId: this.operationId,
      ParameterValues: this.parameterValues,
      ConnectionReference: this.connectionReference,
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

  async parseResponse(response: Response): Promise<GeneratePowerFxFormulaResponse> {
    const data = await response.json();
    return GeneratePowerFxFormulaResponse.fromResponse(data);
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
