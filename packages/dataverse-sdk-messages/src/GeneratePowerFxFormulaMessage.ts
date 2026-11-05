import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
    public parameterValues: EntityReference,
    public connectionReference: EntityReference
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

  toRequestBody(): Record<string, unknown> {
    return {
      OperationId: this.operationId,
      ParameterValues: this.parameterValues,
      ConnectionReference: this.connectionReference,
    };
  }
}

/**
 * GeneratePowerFxFormula response message
 */
export class GeneratePowerFxFormulaResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("GeneratePowerFxFormula");
  }

  static fromResponse(data: unknown): GeneratePowerFxFormulaResponse {
    return new GeneratePowerFxFormulaResponse((data as any).value);
  }
}
