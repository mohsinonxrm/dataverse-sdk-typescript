import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appointment } from "./types/index.js";

/**
 * Response from CreateException action
 */
export interface CreateExceptionResponse {
  id: string;
}

/**
 * CreateException action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.recurringappointmentmaster))
 */
export class CreateExceptionAction implements Executable<CreateExceptionResponse> {
  constructor(
    public readonly target: appointment,
    public readonly originalStartDate: string,
    public readonly isDeleted: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateException`;

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
    return data as CreateExceptionResponse;
  }
}
