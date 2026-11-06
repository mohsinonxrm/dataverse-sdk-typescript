import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the UpdateProcessWithWfomJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateProcessWithWfomJsonRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  WfomJson: string;
}

/**
 * UpdateProcessWithWfomJson request message
 *
 * Web API Action: UpdateProcessWithWfomJson
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class UpdateProcessWithWfomJsonRequest
  extends OrganizationRequest
  implements Executable<UpdateProcessWithWfomJsonResponse>
{
  declare readonly Parameters: Readonly<UpdateProcessWithWfomJsonRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: UpdateProcessWithWfomJsonRequestParameters
  ) {
    super("UpdateProcessWithWfomJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.UpdateProcessWithWfomJson`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      WfomJson: this.Parameters.WfomJson,
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

  async parseResponse(response: Response): Promise<UpdateProcessWithWfomJsonResponse> {
    // No return value (204 No Content)
    return new UpdateProcessWithWfomJsonResponse();
  }
}

/**
 * UpdateProcessWithWfomJson response message
 */
export class UpdateProcessWithWfomJsonResponse extends OrganizationResponse {
  constructor() {
    super("UpdateProcessWithWfomJson");
  }

  static fromResponse(_data: unknown): UpdateProcessWithWfomJsonResponse {
    return new UpdateProcessWithWfomJsonResponse();
  }
}
