import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the msdyn_GetEntityLinkChatConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityLinkChatConfigurationRequestParameters {
  msdyn_RegardingEntityName: string;
}

/**
 * msdyn_GetEntityLinkChatConfiguration request message
 *
 * Web API Function: msdyn_GetEntityLinkChatConfiguration
 */
export class msdyn_GetEntityLinkChatConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityLinkChatConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityLinkChatConfigurationRequestParameters>;

  constructor(parameters: msdyn_GetEntityLinkChatConfigurationRequestParameters) {
    super("msdyn_GetEntityLinkChatConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetEntityLinkChatConfiguration`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.msdyn_RegardingEntityName !== undefined) {
      aliases.push(`msdyn_RegardingEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.msdyn_RegardingEntityName, "Edm.String")
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEntityLinkChatConfigurationResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204)
      return msdyn_GetEntityLinkChatConfigurationResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_GetEntityLinkChatConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEntityLinkChatConfiguration function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_GetEntityLinkChatConfigurationResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * msdyn_GetEntityLinkChatConfiguration response message
 *
 * `result` is the value the msdyn_GetEntityLinkChatConfiguration function returns (see {@link msdyn_GetEntityLinkChatConfigurationResult}).
 */
export class msdyn_GetEntityLinkChatConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityLinkChatConfigurationResult) {
    super("msdyn_GetEntityLinkChatConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEntityLinkChatConfigurationResponse {
    return new msdyn_GetEntityLinkChatConfigurationResponse(
      (data ?? null) as msdyn_GetEntityLinkChatConfigurationResult
    );
  }
}
