import { Box, Tab, Tabs } from "@mui/material";
import { sectionTabs } from "@/lib/sections";
import type { SectionTabId } from "@/lib/sections";

interface SectionTabsProps {
  active?: SectionTabId | false;
  onTabClick: (id: SectionTabId) => void;
}

export const SectionTabs = ({ active = false, onTabClick }: SectionTabsProps) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        mb: 4,
      }}
    >
      <Tabs
        value={active}
        onChange={(_, value: SectionTabId) => onTabClick(value)}
        aria-label="Portfolio sections"
        variant="scrollable"
        scrollButtons="auto"
      >
        {sectionTabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs>
    </Box>
  );
};
