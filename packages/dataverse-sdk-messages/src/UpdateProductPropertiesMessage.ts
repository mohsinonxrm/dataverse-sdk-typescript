import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { dynamicpropertyinstance } from "./types/index.js";

/**
 * UpdateProductProperties request message
 *
 * Web API Action: UpdateProductProperties
 */
export class UpdateProductPropertiesRequest
  extends OrganizationRequest
  implements Executable<UpdateProductPropertiesResponse>
{
  constructor(
    public propertyInstanceList: (EntityReference | EntityPayload<dynamicpropertyinstance>)[]
  ) {
    super("UpdateProductProperties");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateProductProperties`;

    const body: Record<string, unknown> = {
      PropertyInstanceList: this.propertyInstanceList,
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

  async parseResponse(response: Response): Promise<UpdateProductPropertiesResponse> {
    // No return value (204 No Content)
    return new UpdateProductPropertiesResponse();
  }
}

/**
 * UpdateProductProperties response message
 */
export class UpdateProductPropertiesResponse extends OrganizationResponse {
  constructor() {
    super("UpdateProductProperties");
  }

  static fromResponse(_data: unknown): UpdateProductPropertiesResponse {
    return new UpdateProductPropertiesResponse();
  }
}
