import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { appointment } from "./types/index.js";

/**
 * Parameters of the CreateException message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateExceptionRequestParameters {
  Target: EntityReference | EntityPayload<appointment>;
  OriginalStartDate: string;
  IsDeleted: boolean;
}

/**
 * CreateException request message
 *
 * Web API Action: CreateException
 */
export class CreateExceptionRequest
  extends OrganizationRequest
  implements Executable<CreateExceptionResponse>
{
  declare readonly Parameters: Readonly<CreateExceptionRequestParameters>;

  constructor(parameters: CreateExceptionRequestParameters) {
    super("CreateException", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/recurringappointmentmasters/Microsoft.Dynamics.CRM.CreateException`;

    const body = requestBody({
      Target: this.Parameters.Target,
      OriginalStartDate: this.Parameters.OriginalStartDate,
      IsDeleted: this.Parameters.IsDeleted,
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

  async parseResponse(response: Response): Promise<CreateExceptionResponse> {
    // The body is the complex value, with its @odata.context
    return CreateExceptionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateException action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateExceptionResult {
  "@odata.context"?: string;
  id: string;
}

/**
 * CreateException response message
 *
 * `result` is the value the CreateException action returns (see {@link CreateExceptionResult}).
 */
export class CreateExceptionResponse extends OrganizationResponse {
  constructor(public result: CreateExceptionResult) {
    super("CreateException");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateExceptionResponse {
    return new CreateExceptionResponse(data as CreateExceptionResult);
  }
}
