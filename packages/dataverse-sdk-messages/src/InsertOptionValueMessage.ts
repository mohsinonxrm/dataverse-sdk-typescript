import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  InsertOptionValueResponse as InsertOptionValueResponseData,
  Label,
} from "./types/index.js";

/**
 * InsertOptionValue request message
 *
 * Web API Action: InsertOptionValue
 */
export class InsertOptionValueRequest
  extends OrganizationRequest
  implements Executable<InsertOptionValueResponse>
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
    public parentValues: number[],
    public solutionUniqueName: string
  ) {
    super("InsertOptionValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertOptionValue`;

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

  async parseResponse(response: Response): Promise<InsertOptionValueResponse> {
    const data = await response.json();
    return InsertOptionValueResponse.fromResponse(data);
  }
}

/**
 * InsertOptionValue response message
 */
export class InsertOptionValueResponse extends OrganizationResponse {
  constructor(public result: InsertOptionValueResponseData) {
    super("InsertOptionValue");
  }

  static fromResponse(data: unknown): InsertOptionValueResponse {
    return new InsertOptionValueResponse(responseObject<InsertOptionValueResponseData>(data));
  }
}
