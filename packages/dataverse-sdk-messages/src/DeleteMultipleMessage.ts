import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteMultipleRequestParameters {
  Targets: Record<string, unknown>[];
}

/**
 * DeleteMultiple request message
 *
 * Web API Action: DeleteMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class DeleteMultipleRequest
  extends OrganizationRequest
  implements Executable<DeleteMultipleResponse>
{
  declare readonly Parameters: Readonly<DeleteMultipleRequestParameters>;

  constructor(
    public entitySetName: string,
    parameters: DeleteMultipleRequestParameters
  ) {
    super("DeleteMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.DeleteMultiple`;

    const body = requestBody({
      Targets: this.Parameters.Targets,
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

  parseResponse(_response: Response): Promise<DeleteMultipleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeleteMultipleResponse());
  }
}

/**
 * DeleteMultiple response message
 */
export class DeleteMultipleResponse extends OrganizationResponse {
  constructor() {
    super("DeleteMultiple");
  }

  static fromResponse(_data?: unknown): DeleteMultipleResponse {
    return new DeleteMultipleResponse();
  }
}
