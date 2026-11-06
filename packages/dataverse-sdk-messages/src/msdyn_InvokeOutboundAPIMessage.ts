import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocoutboundconfiguration } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeOutboundAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeOutboundAPIRequestParameters {
  OutboundSettingsRecord?: EntityReference | EntityPayload<msdyn_ocoutboundconfiguration>;
  ContactList?: string;
}

/**
 * msdyn_InvokeOutboundAPI request message
 *
 * Web API Action: msdyn_InvokeOutboundAPI
 */
export class msdyn_InvokeOutboundAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeOutboundAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeOutboundAPIRequestParameters>;

  constructor(parameters: msdyn_InvokeOutboundAPIRequestParameters = {}) {
    super("msdyn_InvokeOutboundAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOutboundAPI`;

    const body = requestBody({
      OutboundSettingsRecord: this.Parameters.OutboundSettingsRecord,
      ContactList: this.Parameters.ContactList,
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

  parseResponse(_response: Response): Promise<msdyn_InvokeOutboundAPIResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_InvokeOutboundAPIResponse());
  }
}

/**
 * msdyn_InvokeOutboundAPI response message
 */
export class msdyn_InvokeOutboundAPIResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_InvokeOutboundAPI");
  }

  static fromResponse(_data?: unknown): msdyn_InvokeOutboundAPIResponse {
    return new msdyn_InvokeOutboundAPIResponse();
  }
}
