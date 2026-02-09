import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_LogCMAEvent request message
 *
 * Web API Action: msdyn_LogCMAEvent
 */
export class msdyn_LogCMAEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_LogCMAEventResponse>
{
  constructor(
    public eventType: string,
    public source: string,
    public component: string,
    public eventData: string,
    public entity: EntityReference
  ) {
    super("msdyn_LogCMAEvent");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_LogCMAEventResponse> {
    const data = await response.json();
    return msdyn_LogCMAEventResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EventType: this.eventType,
      Source: this.source,
      Component: this.component,
      EventData: this.eventData,
      Entity: this.entity,
    };
  }
}

/**
 * msdyn_LogCMAEvent response message
 */
export class msdyn_LogCMAEventResponse extends OrganizationResponse {
  constructor(public result: msdyn_LogCMAEventResponse) {
    super("msdyn_LogCMAEvent");
  }

  static fromResponse(data: unknown): msdyn_LogCMAEventResponse {
    return new msdyn_LogCMAEventResponse((data as any).value);
  }
}
