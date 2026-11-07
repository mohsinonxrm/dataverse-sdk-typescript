import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Response from the PickFromQueue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PickFromQueueResponse = void;

/**
 * Parameters of the PickFromQueue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PickFromQueueActionParameters {
  SystemUser: EntityReference | EntityPayload<systemuser>;
  RemoveQueueItem: boolean;
}

/**
 * PickFromQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class PickFromQueueAction implements Executable<PickFromQueueResponse> {
  constructor(
    public readonly queueitemId: string,
    public readonly parameters: PickFromQueueActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.PickFromQueue`;

    const body = requestBody({
      SystemUser: this.parameters.SystemUser,
      RemoveQueueItem: this.parameters.RemoveQueueItem,
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

  parseResponse(_response: Response): Promise<PickFromQueueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
