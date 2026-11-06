import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetEntityLinkChatConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetEntityLinkChatConfigRequestParameters {
  RegardingEntityName: string;
}

/**
 * GetEntityLinkChatConfig request message
 *
 * Web API Action: GetEntityLinkChatConfig
 */
export class GetEntityLinkChatConfigRequest
  extends OrganizationRequest
  implements Executable<GetEntityLinkChatConfigResponse>
{
  declare readonly Parameters: Readonly<GetEntityLinkChatConfigRequestParameters>;

  constructor(parameters: GetEntityLinkChatConfigRequestParameters) {
    super("GetEntityLinkChatConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntityLinkChatConfig`;

    const body = requestBody({
      RegardingEntityName: this.Parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<GetEntityLinkChatConfigResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return GetEntityLinkChatConfigResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GetEntityLinkChatConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetEntityLinkChatConfig action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetEntityLinkChatConfigResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GetEntityLinkChatConfig response message
 *
 * `result` is the value the GetEntityLinkChatConfig action returns (see {@link GetEntityLinkChatConfigResult}).
 */
export class GetEntityLinkChatConfigResponse extends OrganizationResponse {
  constructor(public result: GetEntityLinkChatConfigResult) {
    super("GetEntityLinkChatConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetEntityLinkChatConfigResponse {
    return new GetEntityLinkChatConfigResponse((data ?? null) as GetEntityLinkChatConfigResult);
  }
}
