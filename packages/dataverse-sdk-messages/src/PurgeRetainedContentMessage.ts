import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Parameters of the PurgeRetainedContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PurgeRetainedContentRequestParameters {
  EntityName?: string;
  PageSize?: number;
  OperationId?: string;
  IsMVPCalculatedFromRelatedEntities?: boolean;
  MaxVersionToPurge: number;
}

/**
 * PurgeRetainedContent request message
 *
 * Web API Action: PurgeRetainedContent
 */
export class PurgeRetainedContentRequest
  extends OrganizationRequest
  implements Executable<PurgeRetainedContentResponse>
{
  declare readonly Parameters: Readonly<PurgeRetainedContentRequestParameters>;

  constructor(parameters: PurgeRetainedContentRequestParameters) {
    super("PurgeRetainedContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PurgeRetainedContent`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      PageSize: this.Parameters.PageSize,
      OperationId: this.Parameters.OperationId,
      IsMVPCalculatedFromRelatedEntities: this.Parameters.IsMVPCalculatedFromRelatedEntities,
      MaxVersionToPurge: this.Parameters.MaxVersionToPurge,
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
    return PurgeRetainedContentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PurgeRetainedContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PurgeRetainedContentResult {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
  HasMoreRecords: boolean;
}

/**
 * PurgeRetainedContent response message
 *
 * `result` is the value the PurgeRetainedContent action returns (see {@link PurgeRetainedContentResult}).
 */
export class PurgeRetainedContentResponse extends OrganizationResponse {
  constructor(public result: PurgeRetainedContentResult) {
    super("PurgeRetainedContent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PurgeRetainedContentResponse {
    return new PurgeRetainedContentResponse(data as PurgeRetainedContentResult);
  }
}
