import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * InsertStatusValue request message
 *
 * Web API Action: InsertStatusValue
 */
export class InsertStatusValueRequest
  extends OrganizationRequest
  implements Executable<InsertStatusValueResponse>
{
  constructor(
    public color: string,
    public optionSetName: string,
    public attributeLogicalName: string,
    public entityLogicalName: string,
    public value: number,
    public label: Label,
    public description: Label,
    public stateCode: number,
    public solutionUniqueName: string
  ) {
    super("InsertStatusValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertStatusValue`;

    const body: Record<string, unknown> = {
      Color: this.color,
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      StateCode: this.stateCode,
      SolutionUniqueName: this.solutionUniqueName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InsertStatusValueResponse> {
    const data = await response.json();
    return InsertStatusValueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Color: this.color,
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      StateCode: this.stateCode,
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * InsertStatusValue response message
 */
export class InsertStatusValueResponse extends OrganizationResponse {
  constructor(public result: InsertStatusValueResponse) {
    super("InsertStatusValue");
  }

  static fromResponse(data: unknown): InsertStatusValueResponse {
    return new InsertStatusValueResponse((data as any).value);
  }
}
