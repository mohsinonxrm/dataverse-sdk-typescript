import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { dynamicpropertyinstance } from "./types/index.js";

/**
 * Parameters of the UpdateProductProperties message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateProductPropertiesRequestParameters {
  PropertyInstanceList: (EntityReference | EntityPayload<dynamicpropertyinstance>)[];
}

/**
 * UpdateProductProperties request message
 *
 * Web API Action: UpdateProductProperties
 */
export class UpdateProductPropertiesRequest
  extends OrganizationRequest
  implements Executable<UpdateProductPropertiesResponse>
{
  declare readonly Parameters: Readonly<UpdateProductPropertiesRequestParameters>;

  constructor(parameters: UpdateProductPropertiesRequestParameters) {
    super("UpdateProductProperties", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateProductProperties`;

    const body = requestBody({
      PropertyInstanceList: this.Parameters.PropertyInstanceList,
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

  parseResponse(_response: Response): Promise<UpdateProductPropertiesResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new UpdateProductPropertiesResponse());
  }
}

/**
 * UpdateProductProperties response message
 */
export class UpdateProductPropertiesResponse extends OrganizationResponse {
  constructor() {
    super("UpdateProductProperties");
  }

  static fromResponse(_data?: unknown): UpdateProductPropertiesResponse {
    return new UpdateProductPropertiesResponse();
  }
}
