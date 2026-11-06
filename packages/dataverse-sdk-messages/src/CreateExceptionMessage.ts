import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  CreateExceptionResponse as CreateExceptionResponseData,
  appointment,
} from "./types/index.js";

/**
 * CreateException request message
 *
 * Web API Action: CreateException
 */
export class CreateExceptionRequest
  extends OrganizationRequest
  implements Executable<CreateExceptionResponse>
{
  constructor(
    public target: EntityReference | EntityPayload<appointment>,
    public originalStartDate: string,
    public isDeleted: boolean
  ) {
    super("CreateException");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/recurringappointmentmasters/Microsoft.Dynamics.CRM.CreateException`;

    const body: Record<string, unknown> = {
      Target: this.target,
      OriginalStartDate: this.originalStartDate,
      IsDeleted: this.isDeleted,
    };

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
    const data = await response.json();
    return CreateExceptionResponse.fromResponse(data);
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
