import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateMultiple message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateMultipleRequestParameters {
  Targets: Record<string, unknown>[];
}

/**
 * UpdateMultiple request message
 *
 * Web API Action: UpdateMultiple
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpdateMultipleRequest
  extends OrganizationRequest
  implements Executable<UpdateMultipleResponse>
{
  declare readonly Parameters: Readonly<UpdateMultipleRequestParameters>;

  constructor(
    public entitySetName: string,
    parameters: UpdateMultipleRequestParameters
  ) {
    super("UpdateMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpdateMultiple`;

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

  parseResponse(_response: Response): Promise<UpdateMultipleResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateMultipleResponse());
  }
}

/**
 * UpdateMultiple response message
 */
export class UpdateMultipleResponse extends OrganizationResponse {
  constructor() {
    super("UpdateMultiple");
  }

  static fromResponse(_data?: unknown): UpdateMultipleResponse {
    return new UpdateMultipleResponse();
  }
}
