import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  InsertStatusValueResponse as InsertStatusValueResponseData,
  Label,
} from "./types/index.js";

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
    public color: string | undefined,
    public optionSetName: string | undefined,
    public attributeLogicalName: string | undefined,
    public entityLogicalName: string | undefined,
    public value: number | undefined,
    public label: Label | undefined,
    public description: Label | undefined,
    public stateCode: number,
    public solutionUniqueName?: string
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InsertStatusValueResponse> {
    const data = await response.json();
    return InsertStatusValueResponse.fromResponse(data);
  }
}

/**
 * InsertStatusValue response message
 */
export class InsertStatusValueResponse extends OrganizationResponse {
  constructor(public result: InsertStatusValueResponseData) {
    super("InsertStatusValue");
  }

  static fromResponse(data: unknown): InsertStatusValueResponse {
    return new InsertStatusValueResponse(responseObject<InsertStatusValueResponseData>(data));
  }
}
