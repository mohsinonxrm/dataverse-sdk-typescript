import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_ocoutboundconfiguration } from "./types/index.js";

/**
 * Response from msdyn_InvokeOutboundAPI action
 */
export interface msdyn_InvokeOutboundAPIResponse {
  // No content returned
}

/**
 * msdyn_InvokeOutboundAPI action
 *
 * Unbound action
 */
export class msdyn_InvokeOutboundAPIAction implements Executable<msdyn_InvokeOutboundAPIResponse> {
  constructor(
    public readonly outboundSettingsRecord?:
      EntityReference | EntityPayload<msdyn_ocoutboundconfiguration>,
    public readonly contactList?: string
  ) {}

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
    return {};
  }
}
