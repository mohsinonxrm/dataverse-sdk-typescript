import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AutoMapEntity request message
 *
 * Web API Action: AutoMapEntity
 */
export class AutoMapEntityRequest
  extends OrganizationRequest
  implements Executable<AutoMapEntityResponse>
{
  constructor(public entityMapId: string) {
    super("AutoMapEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AutoMapEntity`;

    const body: Record<string, unknown> = {
      EntityMapId: this.entityMapId,
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

  async parseResponse(response: Response): Promise<AutoMapEntityResponse> {
    // No return value (204 No Content)
    return new AutoMapEntityResponse();
  }
}

/**
 * AutoMapEntity response message
 */
export class AutoMapEntityResponse extends OrganizationResponse {
  constructor() {
    super("AutoMapEntity");
  }

  static fromResponse(_data: unknown): AutoMapEntityResponse {
    return new AutoMapEntityResponse();
  }
}
