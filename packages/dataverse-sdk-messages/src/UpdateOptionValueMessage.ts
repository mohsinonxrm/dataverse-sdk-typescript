import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Parameters of the UpdateOptionValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateOptionValueRequestParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  ExternalValue?: string;
  EntityLogicalName?: string;
  IsHidden?: boolean;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels: boolean;
  ParentValues?: number[];
  SolutionUniqueName?: string;
}

/**
 * UpdateOptionValue request message
 *
 * Web API Action: UpdateOptionValue
 */
export class UpdateOptionValueRequest
  extends OrganizationRequest
  implements Executable<UpdateOptionValueResponse>
{
  declare readonly Parameters: Readonly<UpdateOptionValueRequestParameters>;

  constructor(parameters: UpdateOptionValueRequestParameters) {
    super("UpdateOptionValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateOptionValue`;

    const body = requestBody({
      Color: this.Parameters.Color,
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      ExternalValue: this.Parameters.ExternalValue,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      IsHidden: this.Parameters.IsHidden,
      Value: this.Parameters.Value,
      Label: this.Parameters.Label,
      Description: this.Parameters.Description,
      MergeLabels: this.Parameters.MergeLabels,
      ParentValues: this.Parameters.ParentValues,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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
