import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteOptionValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOptionValueRequestParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value: number;
  SolutionUniqueName?: string;
}

/**
 * DeleteOptionValue request message
 *
 * Web API Action: DeleteOptionValue
 */
export class DeleteOptionValueRequest
  extends OrganizationRequest
  implements Executable<DeleteOptionValueResponse>
{
  declare readonly Parameters: Readonly<DeleteOptionValueRequestParameters>;

  constructor(parameters: DeleteOptionValueRequestParameters) {
    super("DeleteOptionValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOptionValue`;

    const body = requestBody({
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Value: this.Parameters.Value,
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

  async parseResponse(response: Response): Promise<DeleteOptionValueResponse> {
    // No return value (204 No Content)
    return new DeleteOptionValueResponse();
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
