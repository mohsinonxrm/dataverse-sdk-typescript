import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the AddWorkQueueItemProcessingHistoryEntry action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddWorkQueueItemProcessingHistoryEntryResponse = void;

/**
 * Parameters of the AddWorkQueueItemProcessingHistoryEntry action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddWorkQueueItemProcessingHistoryEntryActionParameters {
  item: EntityReference | AnyEntityPayload;
}

/**
 * AddWorkQueueItemProcessingHistoryEntry action
 *
 * Bound action
 * Binding parameter: entity (mscrm.workqueueitem)
 *
 * The first argument is the id of the workqueueitem record to call it on.
 */
export class AddWorkQueueItemProcessingHistoryEntryAction implements Executable<AddWorkQueueItemProcessingHistoryEntryResponse> {
  constructor(
    public readonly workqueueitemId: string,
    public readonly parameters: AddWorkQueueItemProcessingHistoryEntryActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueueitems(${odataLiteral.guid(this.workqueueitemId)})/Microsoft.Dynamics.CRM.AddWorkQueueItemProcessingHistoryEntry`;

    const body = requestBody({
      item: this.parameters.item,
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

  parseResponse(_response: Response): Promise<AddWorkQueueItemProcessingHistoryEntryResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
