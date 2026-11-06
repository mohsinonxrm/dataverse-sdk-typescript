import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * UpdateStateValue request message
 *
 * Web API Action: UpdateStateValue
 */
export class UpdateStateValueRequest
  extends OrganizationRequest
  implements Executable<UpdateStateValueResponse>
{
  constructor(
    public optionSetName: string,
    public attributeLogicalName: string,
    public entityLogicalName: string,
    public value: number,
    public label: Label,
    public description: Label,
    public mergeLabels: boolean,
    public defaultStatusCode: number
  ) {
    super("UpdateStateValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateStateValue`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      MergeLabels: this.mergeLabels,
      DefaultStatusCode: this.defaultStatusCode,
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

  async parseResponse(response: Response): Promise<UpdateStateValueResponse> {
    // No return value (204 No Content)
    return new UpdateStateValueResponse();
  }
}

/**
 * UpdateStateValue response message
 */
export class UpdateStateValueResponse extends OrganizationResponse {
  constructor() {
    super("UpdateStateValue");
  }

  static fromResponse(_data: unknown): UpdateStateValueResponse {
    return new UpdateStateValueResponse();
  }
}
