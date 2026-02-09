import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteOptionValue request message
 *
 * Web API Action: DeleteOptionValue
 */
export class DeleteOptionValueRequest
  extends OrganizationRequest
  implements Executable<DeleteOptionValueResponse>
{
  constructor(
    public optionSetName: string,
    public attributeLogicalName: string,
    public entityLogicalName: string,
    public value: number,
    public solutionUniqueName: string
  ) {
    super("DeleteOptionValue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOptionValue`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
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

  async parseResponse(response: Response): Promise<DeleteOptionValueResponse> {
    // No return value (204 No Content)
    return new DeleteOptionValueResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * DeleteOptionValue response message
 */
export class DeleteOptionValueResponse extends OrganizationResponse {
  constructor() {
    super("DeleteOptionValue");
  }

  static fromResponse(_data: unknown): DeleteOptionValueResponse {
    return new DeleteOptionValueResponse();
  }
}
