import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AutoMapEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AutoMapEntityRequestParameters {
  EntityMapId: string;
}

/**
 * AutoMapEntity request message
 *
 * Web API Action: AutoMapEntity
 */
export class AutoMapEntityRequest
  extends OrganizationRequest
  implements Executable<AutoMapEntityResponse>
{
  declare readonly Parameters: Readonly<AutoMapEntityRequestParameters>;

  constructor(parameters: AutoMapEntityRequestParameters) {
    super("AutoMapEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AutoMapEntity`;

    const body = requestBody({
      EntityMapId: this.Parameters.EntityMapId,
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

  parseResponse(_response: Response): Promise<AutoMapEntityResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new AutoMapEntityResponse());
  }
}

/**
 * AutoMapEntity response message
 */
export class AutoMapEntityResponse extends OrganizationResponse {
  constructor() {
    super("AutoMapEntity");
  }

  static fromResponse(_data?: unknown): AutoMapEntityResponse {
    return new AutoMapEntityResponse();
  }
}
