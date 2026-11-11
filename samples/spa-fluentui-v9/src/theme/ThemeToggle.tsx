import { ToggleButton, Tooltip } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { useThemeMode } from "./ThemeProvider";

/** The light/dark switch of the header, the sign-in page and the environment picker. */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, toggle } = useThemeMode();
  const dark = mode === "dark";
  return (
    <Tooltip
      content={dark ? "Use the light theme" : "Use the dark theme"}
      relationship="description"
    >
      <ToggleButton
        className={className}
        appearance="subtle"
        checked={dark}
        onClick={toggle}
        aria-label="Dark theme"
        icon={dark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
      />
    </Tooltip>
  );
}
