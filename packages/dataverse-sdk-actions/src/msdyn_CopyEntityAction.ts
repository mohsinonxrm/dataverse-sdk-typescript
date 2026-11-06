import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CopyEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CopyEntityResponse {
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
 * Parameters of the msdyn_CopyEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CopyEntityActionParameters {
  EntityName: string;
  TargetRecordId?: string;
  SourceRecordId: string;
  ClientHandledFields?: string;
}

/**
 * msdyn_CopyEntity action
 *
 * Unbound action
 */
export class msdyn_CopyEntityAction implements Executable<msdyn_CopyEntityResponse> {
  constructor(public readonly parameters: msdyn_CopyEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CopyEntity`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      TargetRecordId: this.parameters.TargetRecordId,
      SourceRecordId: this.parameters.SourceRecordId,
      ClientHandledFields: this.parameters.ClientHandledFields,
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
    return (await response.json()) as msdyn_CopyEntityResponse;
  }
}
