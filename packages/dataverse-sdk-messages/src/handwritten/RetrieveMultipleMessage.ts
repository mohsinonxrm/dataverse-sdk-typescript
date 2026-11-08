/**
 * RetrieveMultiple message (#344). Hand-written: RetrieveMultiple isn't a Web API action but
 * `GET /<entity set>?fetchXml=…`.
 */
import {
  DataverseInvalidRequestError,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { OrganizationRequest, OrganizationResponse } from "../OrganizationRequest.js";
import { entitySetOf } from "./internal.js";
import type { RetrieveResult } from "./RetrieveMessage.js";

/** Parameters of the RetrieveMultiple message. */
export interface RetrieveMultipleRequestParameters {
  /**
   * The query, as FetchXML (the .NET `FetchExpression.Query`). Its `<entity name="…">` is the
   * table; page with its `page` and `paging-cookie` attributes.
   */
  Query: string;
  /**
   * The table's entity set, for a table the SDK's `$metadata` snapshot doesn't know, such as a
   * custom table (`"new_widgets"`). Others are found from the query's `<entity name="…">`.
   */
  EntitySetName?: string;
}

/**
 * RetrieveMultiple request message: runs a FetchXML query (`GET /<entity set>?fetchXml=…`) and
 * resolves one page of records. The query goes in the URL, so it is limited to the Web API's
 * 32,768-character URL; use `client.api(entitySet).fetchXml()` for a longer one.
 *
 * @example
 * ```typescript
 * const response = await client.execute(
 *   new RetrieveMultipleRequest({
 *     Query: `<fetch top="5"><entity name="account"><attribute name="name" /></entity></fetch>`,
 *   })
 * );
 * for (const account of response.EntityCollection.value) console.log(account.name);
 * ```
 */
export class RetrieveMultipleRequest
  extends OrganizationRequest
  implements Executable<RetrieveMultipleResponse>
{
  declare readonly Parameters: Readonly<RetrieveMultipleRequestParameters>;

  constructor(parameters: RetrieveMultipleRequestParameters) {
    super("RetrieveMultiple", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const { Query, EntitySetName } = this.Parameters;
    const table = entityNameOf(Query);
    if (!table) {
      throw DataverseInvalidRequestError.invalidParameter(
        "Query",
        'a FetchXML query with an <entity name="…"> element'
      );
    }
    return {
      method: "GET",
      url: `${baseUrl}/${entitySetOf(table, EntitySetName)}?fetchXml=${encodeURIComponent(Query)}`,
      // The paging annotations (paging cookie, more records) and formatted values
      headers: { Accept: "application/json", Prefer: 'odata.include-annotations="*"' },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveMultipleResponse> {
    return new RetrieveMultipleResponse((await response.json()) as RetrieveMultipleResult);
  }
}

/**
 * The `name` of the first `<entity>` element of a FetchXML query. Found with `indexOf` and read
 * from that one tag, so the time stays linear in the query's length whatever it holds (one
 * backtracking pattern over the whole query was flagged by CodeQL as polynomial).
 */
export function entityNameOf(fetchXml: string): string | undefined {
  const lower = fetchXml.toLowerCase();
  for (let at = lower.indexOf("<entity"); at !== -1; at = lower.indexOf("<entity", at + 7)) {
    // "<entity" followed by whitespace, "/" or ">", not "<entityfoo"
    if (!/[\s/>]/.test(lower.charAt(at + 7))) continue;
    const end = fetchXml.indexOf(">", at);
    if (end === -1) return undefined;
    // One tag, with no ">" in it: nothing here can backtrack across the query
    const tag = fetchXml.slice(at + 7, end);
    const match = /(?:^|\s)name\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(tag);
    const name = match?.[1] ?? match?.[2];
    // An empty name="" names no table
    if (name === undefined || name === "") return undefined;
    return name;
  }
  return undefined;
}

/**
 * One page of records, as the Web API returns it: the records in `value`, and the annotations
 * that page through the query.
 */
export interface RetrieveMultipleResult {
  "@odata.context"?: string;
  /** The records. */
  value: RetrieveResult[];
  /** The paging cookie of the next page, for the query's `paging-cookie` attribute. */
  "@Microsoft.Dynamics.CRM.fetchxmlpagingcookie"?: string;
  /** Whether there is another page (absent on the last page). */
  "@Microsoft.Dynamics.CRM.morerecords"?: boolean;
  /** The number of matching records, with `returntotalrecordcount="true"` (at most 5,000). */
  "@Microsoft.Dynamics.CRM.totalrecordcount"?: number;
  /** More than 5,000 records match. */
  "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded"?: boolean;
  [annotation: string]: unknown;
}

/**
 * RetrieveMultiple response message: `result` (also `EntityCollection`, as in .NET) is the page of
 * records.
 */
export class RetrieveMultipleResponse extends OrganizationResponse {
  constructor(public result: RetrieveMultipleResult) {
    super("RetrieveMultiple");
  }

  /** The page of records (the .NET `RetrieveMultipleResponse.EntityCollection`). */
  get EntityCollection(): RetrieveMultipleResult {
    return this.result;
  }
}
