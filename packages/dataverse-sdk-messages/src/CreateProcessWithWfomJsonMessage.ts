import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateProcessWithWfomJson message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateProcessWithWfomJsonRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  WfomJson: string;
}

/**
 * CreateProcessWithWfomJson request message
 *
 * Web API Action: CreateProcessWithWfomJson
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CreateProcessWithWfomJsonRequest
  extends OrganizationRequest
  implements Executable<CreateProcessWithWfomJsonResponse>
{
  declare readonly Parameters: Readonly<CreateProcessWithWfomJsonRequestParameters>;

  constructor(
    public workflowId: string,
    parameters: CreateProcessWithWfomJsonRequestParameters
  ) {
    super("CreateProcessWithWfomJson", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${this.workflowId})/Microsoft.Dynamics.CRM.CreateProcessWithWfomJson`;

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

  async parseResponse(response: Response): Promise<CreateProcessWithWfomJsonResponse> {
    // No return value (204 No Content)
    return new CreateProcessWithWfomJsonResponse();
  }
}

/**
 * CreateProcessWithWfomJson response message
 */
export class CreateProcessWithWfomJsonResponse extends OrganizationResponse {
  constructor() {
    super("CreateProcessWithWfomJson");
  }

  static fromResponse(_data: unknown): CreateProcessWithWfomJsonResponse {
    return new CreateProcessWithWfomJsonResponse();
  }
}
