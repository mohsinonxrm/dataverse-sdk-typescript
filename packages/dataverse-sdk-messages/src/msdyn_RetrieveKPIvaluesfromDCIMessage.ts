import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_RetrieveKPIvaluesfromDCI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKPIvaluesfromDCIRequestParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPINameFilterMap?: string;
  SimilarEntities?: string;
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI request message
 *
 * Web API Action: msdyn_RetrieveKPIvaluesfromDCI
 */
export class msdyn_RetrieveKPIvaluesfromDCIRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKPIvaluesfromDCIResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveKPIvaluesfromDCIRequestParameters>;

  constructor(parameters: msdyn_RetrieveKPIvaluesfromDCIRequestParameters = {}) {
    super("msdyn_RetrieveKPIvaluesfromDCI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIvaluesfromDCI`;

    const body = requestBody({
      CrmRecord: this.Parameters.CrmRecord,
      KPINameFilterMap: this.Parameters.KPINameFilterMap,
      SimilarEntities: this.Parameters.SimilarEntities,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIvaluesfromDCIResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveKPIvaluesfromDCIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveKPIvaluesfromDCI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKPIvaluesfromDCIResult {
  "@odata.context"?: string;
  Errors: string;
  KPIValues: string;
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI response message
 *
 * `result` is the value the msdyn_RetrieveKPIvaluesfromDCI action returns (see {@link msdyn_RetrieveKPIvaluesfromDCIResult}).
 */
export class msdyn_RetrieveKPIvaluesfromDCIResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKPIvaluesfromDCIResult) {
    super("msdyn_RetrieveKPIvaluesfromDCI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveKPIvaluesfromDCIResponse {
    return new msdyn_RetrieveKPIvaluesfromDCIResponse(data as msdyn_RetrieveKPIvaluesfromDCIResult);
  }
}
