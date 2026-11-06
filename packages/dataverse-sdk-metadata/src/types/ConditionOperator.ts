/**
 * ConditionOperator
 *
 * The Web API reads and writes enum members by name (`"Equal"`), never by number,
 * so this is a string union. `ConditionOperator.Equal` is the name; each member's comment
 * gives its numeric value.
 */
export const ConditionOperator = {
  /** 0 */
  Equal: "Equal",
  /** 1 */
  NotEqual: "NotEqual",
  /** 2 */
  GreaterThan: "GreaterThan",
  /** 3 */
  LessThan: "LessThan",
  /** 4 */
  GreaterEqual: "GreaterEqual",
  /** 5 */
  LessEqual: "LessEqual",
  /** 6 */
  Like: "Like",
  /** 7 */
  NotLike: "NotLike",
  /** 8 */
  In: "In",
  /** 9 */
  NotIn: "NotIn",
  /** 10 */
  Between: "Between",
  /** 11 */
  NotBetween: "NotBetween",
  /** 12 */
  Null: "Null",
  /** 13 */
  NotNull: "NotNull",
  /** 14 */
  Yesterday: "Yesterday",
  /** 15 */
  Today: "Today",
  /** 16 */
  Tomorrow: "Tomorrow",
  /** 17 */
  Last7Days: "Last7Days",
  /** 18 */
  Next7Days: "Next7Days",
  /** 19 */
  LastWeek: "LastWeek",
  /** 20 */
  ThisWeek: "ThisWeek",
  /** 21 */
  NextWeek: "NextWeek",
  /** 22 */
  LastMonth: "LastMonth",
  /** 23 */
  ThisMonth: "ThisMonth",
  /** 24 */
  NextMonth: "NextMonth",
  /** 25 */
  On: "On",
  /** 26 */
  OnOrBefore: "OnOrBefore",
  /** 27 */
  OnOrAfter: "OnOrAfter",
  /** 28 */
  LastYear: "LastYear",
  /** 29 */
  ThisYear: "ThisYear",
  /** 30 */
  NextYear: "NextYear",
  /** 31 */
  LastXHours: "LastXHours",
  /** 32 */
  NextXHours: "NextXHours",
  /** 33 */
  LastXDays: "LastXDays",
  /** 34 */
  NextXDays: "NextXDays",
  /** 35 */
  LastXWeeks: "LastXWeeks",
  /** 36 */
  NextXWeeks: "NextXWeeks",
  /** 37 */
  LastXMonths: "LastXMonths",
  /** 38 */
  NextXMonths: "NextXMonths",
  /** 39 */
  LastXYears: "LastXYears",
  /** 40 */
  NextXYears: "NextXYears",
  /** 41 */
  EqualUserId: "EqualUserId",
  /** 42 */
  NotEqualUserId: "NotEqualUserId",
  /** 43 */
  EqualBusinessId: "EqualBusinessId",
  /** 44 */
  NotEqualBusinessId: "NotEqualBusinessId",
  /** 45 */
  ChildOf: "ChildOf",
  /** 46 */
  Mask: "Mask",
  /** 47 */
  NotMask: "NotMask",
  /** 48 */
  MasksSelect: "MasksSelect",
  /** 49 */
  Contains: "Contains",
  /** 50 */
  DoesNotContain: "DoesNotContain",
  /** 51 */
  EqualUserLanguage: "EqualUserLanguage",
  /** 52 */
  NotOn: "NotOn",
  /** 53 */
  OlderThanXMonths: "OlderThanXMonths",
  /** 54 */
  BeginsWith: "BeginsWith",
  /** 55 */
  DoesNotBeginWith: "DoesNotBeginWith",
  /** 56 */
  EndsWith: "EndsWith",
  /** 57 */
  DoesNotEndWith: "DoesNotEndWith",
  /** 58 */
  ThisFiscalYear: "ThisFiscalYear",
  /** 59 */
  ThisFiscalPeriod: "ThisFiscalPeriod",
  /** 60 */
  NextFiscalYear: "NextFiscalYear",
  /** 61 */
  NextFiscalPeriod: "NextFiscalPeriod",
  /** 62 */
  LastFiscalYear: "LastFiscalYear",
  /** 63 */
  LastFiscalPeriod: "LastFiscalPeriod",
  /** 64 */
  LastXFiscalYears: "LastXFiscalYears",
  /** 65 */
  LastXFiscalPeriods: "LastXFiscalPeriods",
  /** 66 */
  NextXFiscalYears: "NextXFiscalYears",
  /** 67 */
  NextXFiscalPeriods: "NextXFiscalPeriods",
  /** 68 */
  InFiscalYear: "InFiscalYear",
  /** 69 */
  InFiscalPeriod: "InFiscalPeriod",
  /** 70 */
  InFiscalPeriodAndYear: "InFiscalPeriodAndYear",
  /** 71 */
  InOrBeforeFiscalPeriodAndYear: "InOrBeforeFiscalPeriodAndYear",
  /** 72 */
  InOrAfterFiscalPeriodAndYear: "InOrAfterFiscalPeriodAndYear",
  /** 73 */
  EqualUserTeams: "EqualUserTeams",
  /** 74 */
  EqualUserOrUserTeams: "EqualUserOrUserTeams",
  /** 75 */
  Under: "Under",
  /** 76 */
  NotUnder: "NotUnder",
  /** 77 */
  UnderOrEqual: "UnderOrEqual",
  /** 78 */
  Above: "Above",
  /** 79 */
  AboveOrEqual: "AboveOrEqual",
  /** 80 */
  EqualUserOrUserHierarchy: "EqualUserOrUserHierarchy",
  /** 81 */
  EqualUserOrUserHierarchyAndTeams: "EqualUserOrUserHierarchyAndTeams",
  /** 82 */
  OlderThanXYears: "OlderThanXYears",
  /** 83 */
  OlderThanXWeeks: "OlderThanXWeeks",
  /** 84 */
  OlderThanXDays: "OlderThanXDays",
  /** 85 */
  OlderThanXHours: "OlderThanXHours",
  /** 86 */
  OlderThanXMinutes: "OlderThanXMinutes",
  /** 87 */
  ContainValues: "ContainValues",
  /** 88 */
  DoesNotContainValues: "DoesNotContainValues",
  /** 89 */
  EqualRoleBusinessId: "EqualRoleBusinessId",
} as const;

export type ConditionOperator = (typeof ConditionOperator)[keyof typeof ConditionOperator];
