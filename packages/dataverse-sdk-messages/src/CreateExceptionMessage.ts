import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  CreateExceptionResponse as CreateExceptionResponseData,
  appointment,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return CreateExceptionResponse.fromResponse({});
    return CreateExceptionResponse.fromResponse(await response.json());
  }
}

/**
 * CreateException response message
 */
export class CreateExceptionResponse extends OrganizationResponse {
  constructor(public result: CreateExceptionResponseData) {
    super("CreateException");
  }

  static fromResponse(data: unknown): CreateExceptionResponse {
    return new CreateExceptionResponse(responseObject<CreateExceptionResponseData>(data));
  }
}
