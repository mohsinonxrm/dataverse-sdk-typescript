import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * UpdateOptionValue request message
 *
 * Web API Action: UpdateOptionValue
 */
export class UpdateOptionValueRequest
  extends OrganizationRequest
  implements Executable<UpdateOptionValueResponse>
{
  constructor(
    public color: string,
    public optionSetName: string,
    public attributeLogicalName: string,
    public externalValue: string,
    public entityLogicalName: string,
    public isHidden: boolean,
    public value: number,
    public label: Label,
    public description: Label,
    public mergeLabels: boolean,
    public parentValues: number[],
    public solutionUniqueName: string
  ) {
    super("UpdateOptionValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateOptionValue`;

    const body: Record<string, unknown> = {
      Color: this.color,
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      ExternalValue: this.externalValue,
      EntityLogicalName: this.entityLogicalName,
      IsHidden: this.isHidden,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      MergeLabels: this.mergeLabels,
      ParentValues: this.parentValues,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<UpdateOptionValueResponse> {
    // No return value (204 No Content)
    return new UpdateOptionValueResponse();
  }
}

/**
 * UpdateOptionValue response message
 */
export class UpdateOptionValueResponse extends OrganizationResponse {
  constructor() {
    super("UpdateOptionValue");
  }

  static fromResponse(_data: unknown): UpdateOptionValueResponse {
    return new UpdateOptionValueResponse();
  }
}
