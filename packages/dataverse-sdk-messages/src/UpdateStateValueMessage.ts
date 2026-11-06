import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Parameters of the UpdateStateValue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateStateValueRequestParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels: boolean;
  DefaultStatusCode?: number;
}

/**
 * UpdateStateValue request message
 *
 * Web API Action: UpdateStateValue
 */
export class UpdateStateValueRequest
  extends OrganizationRequest
  implements Executable<UpdateStateValueResponse>
{
  declare readonly Parameters: Readonly<UpdateStateValueRequestParameters>;

  constructor(parameters: UpdateStateValueRequestParameters) {
    super("UpdateStateValue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateStateValue`;

    const body = requestBody({
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Value: this.Parameters.Value,
      Label: this.Parameters.Label,
      Description: this.Parameters.Description,
      MergeLabels: this.Parameters.MergeLabels,
      DefaultStatusCode: this.Parameters.DefaultStatusCode,
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

  parseResponse(_response: Response): Promise<UpdateStateValueResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateStateValueResponse());
  }
}

/**
 * UpdateStateValue response message
 */
export class UpdateStateValueResponse extends OrganizationResponse {
  constructor() {
    super("UpdateStateValue");
  }

  static fromResponse(_data?: unknown): UpdateStateValueResponse {
    return new UpdateStateValueResponse();
  }
}
