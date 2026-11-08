/**
 * Create message (#344). Hand-written: Create isn't a Web API action but `POST /<entity set>`.
 */
import {
  entityIdFromResponse,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import type { AnyEntityPayload } from "../types/EntityPayload.js";
import { columnsOf, entitySetOf, tableOf } from "./internal.js";

/** Parameters of the Create message. */
export interface CreateRequestParameters {
  /**
   * The record to create: `@odata.type` names the table (`"Microsoft.Dynamics.CRM.account"`), and
   * the other properties are its columns and `<lookup>@odata.bind` values, as the Web API takes
   * them (the .NET `Entity`).
   */
  Target: AnyEntityPayload;
  /**
   * The table's entity set, for a table the SDK's `$metadata` snapshot doesn't know, such as a
   * custom table (`"new_widgets"`). Others are found from `@odata.type`.
   */
  EntitySetName?: string;
}

/**
 * Create request message: creates a record (`POST /<entity set>`).
 *
 * @example
 * ```typescript
 * const response = await client.execute(
 *   new CreateRequest({ Target: { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso" } })
 * );
 * console.log(response.id); // the new account's id
 * ```
 */
export class CreateRequest extends OrganizationRequest implements Executable<CreateResponse> {
  declare readonly Parameters: Readonly<CreateRequestParameters>;

  constructor(parameters: CreateRequestParameters) {
    super("Create", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Target, EntitySetName } = this.Parameters;
    const entitySet = entitySetOf(tableOf(Target, "Target"), EntitySetName);
    return {
      method: "POST",
      url: `${baseUrl}/${entitySet}`,
      headers: { "content-type": "application/json" },
      body: columnsOf(Target),
    };
  }

  parseResponse(response: Response): Promise<CreateResponse> {
    // 204 No Content, with the new record's URL in OData-EntityId
    return Promise.resolve(new CreateResponse(entityIdFromResponse(response)));
  }
}

/** The id of the created record. */
export type CreateResult = string;

/** Create response message: `result` (also `id`, as in .NET) is the new record's id. */
export class CreateResponse extends OrganizationResponse {
  constructor(public result: CreateResult) {
    super("Create");
  }

  /** The new record's id (the .NET `CreateResponse.id`). */
  get id(): string {
    return this.result;
  }
}
