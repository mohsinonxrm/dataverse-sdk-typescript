import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CopyEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopyEntityRequestParameters {
  EntityName: string;
  TargetRecordId?: string;
  SourceRecordId: string;
  ClientHandledFields?: string;
}

/**
 * msdyn_CopyEntity request message
 *
 * Web API Action: msdyn_CopyEntity
 */
export class msdyn_CopyEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CopyEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_CopyEntityRequestParameters>;

  constructor(parameters: msdyn_CopyEntityRequestParameters) {
    super("msdyn_CopyEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEntity`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      TargetRecordId: this.Parameters.TargetRecordId,
      SourceRecordId: this.Parameters.SourceRecordId,
      ClientHandledFields: this.Parameters.ClientHandledFields,
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

  async parseResponse(response: Response): Promise<msdyn_CopyEntityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CopyEntityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CopyEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CopyEntityResult {
  "@odata.context"?: string;
  Errors: string;
  FieldsUpdated: number;
  ProductsCopied: number;
  ProductsSkipped: number;
  StakeholdersCopied: number;
  Success: boolean;
  TargetEntityName: string;
  TargetRecordId: string;
}

/**
 * msdyn_CopyEntity response message
 *
 * `result` is the value the msdyn_CopyEntity action returns (see {@link msdyn_CopyEntityResult}).
 */
export class msdyn_CopyEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_CopyEntityResult) {
    super("msdyn_CopyEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CopyEntityResponse {
    return new msdyn_CopyEntityResponse(data as msdyn_CopyEntityResult);
  }
}
