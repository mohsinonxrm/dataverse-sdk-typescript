import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_LogCMAEvent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogCMAEventRequestParameters {
  Component: string;
  EventData?: string;
  Entity?: EntityReference | AnyEntityPayload;
  EventType: string;
  Source: string;
}

/**
 * msdyn_LogCMAEvent request message
 *
 * Web API Action: msdyn_LogCMAEvent
 */
export class msdyn_LogCMAEventRequest
  extends OrganizationRequest
  implements Executable<msdyn_LogCMAEventResponse>
{
  declare readonly Parameters: Readonly<msdyn_LogCMAEventRequestParameters>;

  constructor(parameters: msdyn_LogCMAEventRequestParameters) {
    super("msdyn_LogCMAEvent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogCMAEvent`;

    const body = requestBody({
      Component: this.Parameters.Component,
      EventData: this.Parameters.EventData,
      Entity: this.Parameters.Entity,
      EventType: this.Parameters.EventType,
      Source: this.Parameters.Source,
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

  async parseResponse(response: Response): Promise<msdyn_LogCMAEventResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_LogCMAEventResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_LogCMAEvent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LogCMAEventResult {
  "@odata.context"?: string;
  Code: string;
  Message: string;
}

/**
 * msdyn_LogCMAEvent response message
 *
 * `result` is the value the msdyn_LogCMAEvent action returns (see {@link msdyn_LogCMAEventResult}).
 */
export class msdyn_LogCMAEventResponse extends OrganizationResponse {
  constructor(public result: msdyn_LogCMAEventResult) {
    super("msdyn_LogCMAEvent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LogCMAEventResponse {
    return new msdyn_LogCMAEventResponse(data as msdyn_LogCMAEventResult);
  }
}
