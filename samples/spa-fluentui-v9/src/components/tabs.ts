import { useId } from "react";
import type { SelectTabData, SelectTabEvent } from "@fluentui/react-components";

/**
 * Props for a `TabList`, its `Tab`s and the one tab panel that shows the selected tab's content,
 * wired as the ARIA tabs pattern has it: each tab controls the panel, and the panel is labelled
 * by the selected tab.
 *
 * ```tsx
 * const tabs = useTabs(tab, setTab, "Response details");
 * <TabList {...tabs.list}><Tab {...tabs.tab("code")}>SDK code</Tab></TabList>
 * <div {...tabs.panel}>{tab === "code" && …}</div>
 * ```
 */
export function useTabs<T extends string>(
  selected: T,
  onSelect: (value: T) => void,
  label: string
) {
  const id = useId();
  const tabId = (value: T) => `${id}-tab-${value}`;
  const panelId = `${id}-panel`;
  return {
    list: {
      selectedValue: selected,
      onTabSelect: (_: SelectTabEvent, data: SelectTabData) => onSelect(data.value as T),
      "aria-label": label,
      size: "small" as const,
    },
    tab: (value: T) => ({ value, id: tabId(value), "aria-controls": panelId }),
    panel: { role: "tabpanel", id: panelId, "aria-labelledby": tabId(selected) },
  };
}
