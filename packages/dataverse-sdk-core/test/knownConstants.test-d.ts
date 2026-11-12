/**
 * #481: type tests (tsd) for the known Dataverse constants: literal unions, the open
 * `Known | (string & {})` parameters that still take any string, and the per-class `name` types.
 * #480, #482: the unions that replaced plain `string` and `number` fields and parameters.
 */
import { expectAssignable, expectError, expectNotAssignable, expectType } from "tsd";
import {
  AsyncOperationStateCode,
  AsyncOperationStatusCode,
  TelemetryEvents,
  odataLiteral,
  waitForAsyncOperation,
  type AsyncOperation,
  type DependencyTelemetry,
  type EdmPrimitiveType,
  type HttpMethod,
  type LoggingOptions,
  type LogLevel,
  type ODataTypeName,
  type TelemetryClient,
  type TelemetryEventName,
  Annotations,
  DataverseAbortError,
  DataverseAuthenticationError,
  DataverseError,
  DataverseErrorCode,
  DataverseHeaders,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  DataverseServiceError,
  Prefer,
  PreferBuilder,
  hasErrorCode,
  type AnnotationTerm,
  type DataverseAuthenticationErrorName,
  type DataverseClient,
  type DataverseHeaderValue,
  type DataverseInvalidRequestErrorName,
  type DataverseNetworkErrorName,
  type DataverseServiceErrorName,
} from "../src/index.js";

declare const client: DataverseClient;
declare const someString: string;

// The objects keep their literals; each type is the union of its object's values.
expectType<"0x80072322">(DataverseErrorCode.ServiceProtectionRequests);
expectType<"MSCRM.BypassBusinessLogicExecution">(DataverseHeaders.BypassBusinessLogicExecution);
expectType<"OData.Community.Display.V1.FormattedValue">(Annotations.FormattedValue);
expectAssignable<DataverseErrorCode>("0x80040333");
expectNotAssignable<DataverseErrorCode>("0x80040334");
expectAssignable<DataverseHeaders>("Consistency");
expectNotAssignable<DataverseHeaders>("Consistancy");
expectAssignable<AnnotationTerm>("*");
expectNotAssignable<AnnotationTerm>("OData.Community.Display.V1.FormatedValue");

// Read-only, like the metadata package's enum objects.
expectError((DataverseErrorCode.ObjectDoesNotExist = "0x80040217"));

// DataverseError.code: the known codes, or any other string.
declare const err: DataverseError;
expectType<DataverseErrorCode | (string & {}) | undefined>(err.code);
new DataverseError("x", { code: DataverseErrorCode.DuplicateRecordsFound });
new DataverseError("x", { code: someString });
err.code = "0x80048d19";

// hasErrorCode: any error value, a known code or any other code.
expectType<boolean>(hasErrorCode(err, DataverseErrorCode.ObjectDoesNotExist));
expectType<boolean>(hasErrorCode(new Error("x"), "0x80048d19"));
expectType<boolean>(hasErrorCode(err.code, someString));
expectError(hasErrorCode(err, 0x80040217));

// header(): a known name with a known value or any string; any other name with any string.
const builder = client.api("accounts");
builder.header(DataverseHeaders.BypassBusinessLogicExecution, "CustomSync");
builder.header(DataverseHeaders.BypassBusinessLogicExecution, "CustomSync,CustomAsync");
builder.header(DataverseHeaders.Consistency, "Strong");
builder.header(DataverseHeaders.SolutionUniqueName, someString);
builder.header(DataverseHeaders.BypassCustomPluginExecution, String(true));
builder.header("MSCRM.MergeLabels", "true");
builder.header("x-custom", someString);
builder.header(someString, someString);
expectType<typeof builder>(builder.header(DataverseHeaders.MergeLabels, "true"));
expectError(builder.header(DataverseHeaders.Consistency, 1));
expectType<"Strong" | (string & {})>({} as DataverseHeaderValue<"Consistency">);
expectType<string>({} as DataverseHeaderValue<"MSCRM.SolutionUniqueName">);
expectType<string>({} as DataverseHeaderValue<string>);

// Prefer annotation terms: a known term or any other (wildcards, lists).
Prefer.includeAnnotations(Annotations.LookupLogicalName);
Prefer.includeAnnotations("Microsoft.Dynamics.CRM.*,OData.Community.Display.V1.FormattedValue");
Prefer.includeAnnotations(someString);
expectError(Prefer.includeAnnotations(1));
new PreferBuilder().formattedValues(Annotations.All);
new PreferBuilder().formattedValues(someString);

// Error names: the SDK's names complete, any other name is still allowed (subclasses set theirs).
declare const auth: DataverseAuthenticationError;
declare const invalid: DataverseInvalidRequestError;
declare const service: DataverseServiceError;
declare const network: DataverseNetworkError;
declare const abort: DataverseAbortError;
expectType<DataverseAuthenticationErrorName | (string & {})>(auth.name);
expectType<DataverseInvalidRequestErrorName | (string & {})>(invalid.name);
expectType<DataverseServiceErrorName | (string & {})>(service.name);
expectType<DataverseNetworkErrorName | (string & {})>(network.name);
expectType<"AbortError" | (string & {})>(abort.name);
expectAssignable<DataverseServiceErrorName>("TooManyRequests");
expectNotAssignable<DataverseServiceErrorName>("TooManyRequest");
expectAssignable<DataverseNetworkErrorName>("RequestTimeout");
expectAssignable<DataverseInvalidRequestErrorName>("InvalidTenantId");
expectAssignable<DataverseAuthenticationErrorName>("Unauthorized");
invalid.name = "InvalidCloud";
invalid.name = someString;

// A subclass can still set its own name.
export class AppAuthError extends DataverseAuthenticationError {
  constructor() {
    super("x");
    this.name = "AppSpecific";
  }
}

// #480: HttpMethod for response() and DependencyTelemetry.method.
expectType<Promise<Response>>(client.api("accounts").response("PATCH", { name: "A" }));
expectError(client.api("accounts").response("PATHC"));
expectError(client.api("accounts").response(someString));
expectType<HttpMethod | undefined>(({} as DependencyTelemetry).method);
expectNotAssignable<DependencyTelemetry>({ method: "HEAD" });

// #480: LogLevel in LoggingOptions.
expectType<LogLevel | undefined>(({} as LoggingOptions).logLevel);

// #480: event names. The SDK's are suggested; any other name is still allowed.
expectType<"dataverse.throttle">(TelemetryEvents.throttle);
expectAssignable<TelemetryEventName>("dataverse.batch");
expectNotAssignable<TelemetryEventName>("dataverse.batches");
client.trackEvent(TelemetryEvents.retry);
client.trackEvent("my.app.event", { a: "1" });
client.trackEvent(someString);
// A telemetry client written with `name: string` still implements the interface.
expectAssignable<TelemetryClient>({
  trackEvent: (_name: string) => undefined,
  startDependency: () => ({ end: () => undefined }),
  trackException: () => undefined,
});

// #480: a system job's statecode and statuscode suggest the known values and take any number, so
// typed JSON still type-checks (a status the SDK doesn't know counts as a failure).
declare const job: AsyncOperation;
expectType<AsyncOperationStateCode | (number & {})>(job.statecode);
expectType<AsyncOperationStatusCode | (number & {})>(job.statuscode);
expectType<3>(AsyncOperationStateCode.Completed);
expectAssignable<AsyncOperationStatusCode>(30);
expectNotAssignable<AsyncOperationStatusCode>(33);
expectNotAssignable<AsyncOperationStateCode>(4);
declare const someNumber: number;
expectAssignable<AsyncOperation>({ asyncoperationid: "x", statecode: someNumber, statuscode: 99 });
expectType<Promise<AsyncOperation>>(waitForAsyncOperation(client, "id"));

// #482: OData type names: the Edm primitives are suggested; other type names still work.
expectAssignable<EdmPrimitiveType>("Edm.Int32");
expectNotAssignable<EdmPrimitiveType>("Edm.Int");
expectAssignable<ODataTypeName>("Microsoft.Dynamics.CRM.EntityFilters");
expectType<string>(odataLiteral.parameter(1, "Edm.Int32"));
expectType<string>(odataLiteral.parameter(1, someString));
