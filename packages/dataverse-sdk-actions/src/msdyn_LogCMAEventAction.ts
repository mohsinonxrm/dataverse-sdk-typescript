import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_LogCMAEvent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LogCMAEventResponse {
  "@odata.context"?: string;
  Code: string;
  Message: string;
}

/**
 * Parameters of the msdyn_LogCMAEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LogCMAEventActionParameters {
  Component: string;
  EventData?: string;
  Entity?: EntityReference | AnyEntityPayload;
  EventType: string;
  Source: string;
}

/**
 * msdyn_LogCMAEvent action
 *
 * Unbound action
 */
export class msdyn_LogCMAEventAction implements Executable<msdyn_LogCMAEventResponse> {
  constructor(public readonly parameters: msdyn_LogCMAEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LogCMAEvent`;

    const body = requestBody({
      Component: this.parameters.Component,
      EventData: this.parameters.EventData,
      Entity: this.parameters.Entity,
      EventType: this.parameters.EventType,
      Source: this.parameters.Source,
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
    return (await response.json()) as msdyn_LogCMAEventResponse;
  }
}
