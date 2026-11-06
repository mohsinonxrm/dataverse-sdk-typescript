import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the FormPredict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormPredictRequestParameters {
  requestedFields: string[];
  predictorFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
  context?: string;
  entityName: string;
}

/**
 * FormPredict request message
 *
 * Web API Action: FormPredict
 */
export class FormPredictRequest
  extends OrganizationRequest
  implements Executable<FormPredictResponse>
{
  declare readonly Parameters: Readonly<FormPredictRequestParameters>;

  constructor(parameters: FormPredictRequestParameters) {
    super("FormPredict", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FormPredict`;

    const body = requestBody({
      requestedFields: this.Parameters.requestedFields,
      predictorFields: this.Parameters.predictorFields,
      recordValues: this.Parameters.recordValues,
      clientPartnerSource: this.Parameters.clientPartnerSource,
      context: this.Parameters.context,
      entityName: this.Parameters.entityName,
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

  async parseResponse(response: Response): Promise<FormPredictResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return FormPredictResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return FormPredictResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the FormPredict action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type FormPredictResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * FormPredict response message
 *
 * `result` is the value the FormPredict action returns (see {@link FormPredictResult}).
 */
export class FormPredictResponse extends OrganizationResponse {
  constructor(public result: FormPredictResult) {
    super("FormPredict");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): FormPredictResponse {
    return new FormPredictResponse((data ?? null) as FormPredictResult);
  }
}
