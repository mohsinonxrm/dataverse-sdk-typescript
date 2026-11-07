import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveKpiItemRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKpiItemRecordRequestParameters {
  CrmRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_RetrieveKpiItemRecord request message
 *
 * Web API Action: msdyn_RetrieveKpiItemRecord
 */
export class msdyn_RetrieveKpiItemRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKpiItemRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKpiItemRecordRequestParameters>;

  constructor(parameters: msdyn_RetrieveKpiItemRecordRequestParameters) {
    super("msdyn_RetrieveKpiItemRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKpiItemRecord`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKpiItemRecordResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKpiItemRecordResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKpiItemRecord action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKpiItemRecordResult {
  "@odata.context"?: string;
  LastModifiedOn: string;
}

/**
 * msdyn_RetrieveKpiItemRecord response message
 *
 * `result` is the value the msdyn_RetrieveKpiItemRecord action returns (see {@link msdyn_RetrieveKpiItemRecordResult}).
 */
export class msdyn_RetrieveKpiItemRecordResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKpiItemRecordResult) {
    super("msdyn_RetrieveKpiItemRecord");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKpiItemRecordResponse {
    return new msdyn_RetrieveKpiItemRecordResponse(data as msdyn_RetrieveKpiItemRecordResult);
  }
}
