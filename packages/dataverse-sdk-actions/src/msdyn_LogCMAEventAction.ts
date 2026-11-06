import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_LogCMAEvent action
 */
export interface msdyn_LogCMAEventResponse {
  Code: string;
  Message: string;
}

/**
 * msdyn_LogCMAEvent action
 *
 * Unbound action
 */
export class msdyn_LogCMAEventAction implements Executable<msdyn_LogCMAEventResponse> {
  constructor(
    public readonly eventType: string,
    public readonly source: string,
    public readonly component: string,
    public readonly eventData?: string,
    public readonly entity?: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogCMAEvent`;

    const body: Record<string, unknown> = {
      EventType: this.eventType,
      Source: this.source,
      Component: this.component,
      EventData: this.eventData,
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<msdyn_LogCMAEventResponse> {
    const data = await response.json();
    return data as msdyn_LogCMAEventResponse;
  }
}
