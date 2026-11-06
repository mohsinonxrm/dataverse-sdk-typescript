import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from the PurgeRetainedContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PurgeRetainedContentResponse {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
  HasMoreRecords: boolean;
}

/**
 * Parameters of the PurgeRetainedContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PurgeRetainedContentActionParameters {
  EntityName?: string;
  PageSize?: number;
  OperationId?: string;
  IsMVPCalculatedFromRelatedEntities?: boolean;
  MaxVersionToPurge: number;
}

/**
 * PurgeRetainedContent action
 *
 * Unbound action
 */
export class PurgeRetainedContentAction implements Executable<PurgeRetainedContentResponse> {
  constructor(public readonly parameters: PurgeRetainedContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PurgeRetainedContent`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      PageSize: this.parameters.PageSize,
      OperationId: this.parameters.OperationId,
      IsMVPCalculatedFromRelatedEntities: this.parameters.IsMVPCalculatedFromRelatedEntities,
      MaxVersionToPurge: this.parameters.MaxVersionToPurge,
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

  async parseResponse(response: Response): Promise<PurgeRetainedContentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PurgeRetainedContentResponse;
  }
}
