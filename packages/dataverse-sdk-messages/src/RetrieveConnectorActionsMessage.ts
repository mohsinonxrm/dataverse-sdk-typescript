import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RetrieveConnectorActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveConnectorActionsRequestParameters {
  ConnectionReference: EntityReference | AnyEntityPayload;
}

/**
 * RetrieveConnectorActions request message
 *
 * Web API Action: RetrieveConnectorActions
 */
export class RetrieveConnectorActionsRequest
  extends OrganizationRequest
  implements Executable<RetrieveConnectorActionsResponse>
{
  declare readonly Parameters: Readonly<RetrieveConnectorActionsRequestParameters>;

  constructor(parameters: RetrieveConnectorActionsRequestParameters) {
    super("RetrieveConnectorActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveConnectorActions`;

    const body = requestBody({
      ConnectionReference: this.Parameters.ConnectionReference,
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

  async parseResponse(response: Response): Promise<RetrieveConnectorActionsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveConnectorActionsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveConnectorActionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveConnectorActions action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveConnectorActionsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveConnectorActions response message
 *
 * `result` is the value the RetrieveConnectorActions action returns (see {@link RetrieveConnectorActionsResult}).
 */
export class RetrieveConnectorActionsResponse extends OrganizationResponse {
  constructor(public result: RetrieveConnectorActionsResult) {
    super("RetrieveConnectorActions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveConnectorActionsResponse {
    return new RetrieveConnectorActionsResponse(
      data === undefined ? [] : (data as { value: RetrieveConnectorActionsResult }).value
    );
  }
}
