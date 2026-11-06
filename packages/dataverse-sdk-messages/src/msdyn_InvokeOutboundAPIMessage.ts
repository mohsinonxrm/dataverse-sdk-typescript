import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocoutboundconfiguration } from "./types/index.js";

/**
 * msdyn_InvokeOutboundAPI request message
 *
 * Web API Action: msdyn_InvokeOutboundAPI
 */
export class msdyn_InvokeOutboundAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeOutboundAPIResponse>
{
  constructor(
    public outboundSettingsRecord?: EntityReference | EntityPayload<msdyn_ocoutboundconfiguration>,
    public contactList?: string
  ) {
    super("msdyn_InvokeOutboundAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeOutboundAPI`;

    const body: Record<string, unknown> = {
      OutboundSettingsRecord: this.outboundSettingsRecord,
      ContactList: this.contactList,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeOutboundAPIResponse> {
    // No return value (204 No Content)
    return new msdyn_InvokeOutboundAPIResponse();
  }
}

/**
 * msdyn_InvokeOutboundAPI response message
 */
export class msdyn_InvokeOutboundAPIResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_InvokeOutboundAPI");
  }

  static fromResponse(_data: unknown): msdyn_InvokeOutboundAPIResponse {
    return new msdyn_InvokeOutboundAPIResponse();
  }
}
