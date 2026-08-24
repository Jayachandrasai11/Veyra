/**
 * VEYRA — Language & Region Settings Section
 * Source: design_system/Components/inputs_forms.md (selects, labels)
 *         design_system/UX Writing/Currency.md (locale formatting)
 */

import { SettingGroup, SettingRow, SettingSelect } from "../SettingsPrimitives";
import {
  CURRENCY_OPTIONS,
  DATE_FORMAT_OPTIONS,
  LANGUAGE_OPTIONS,
} from "../../constants";
import type { LanguageRegionSettings } from "../../types";

interface LanguageRegionSectionProps {
  value: LanguageRegionSettings;
  update: (patch: Partial<LanguageRegionSettings>) => void;
}

export function LanguageRegionSection({ value, update }: LanguageRegionSectionProps) {
  return (
    <SettingGroup title="Language & Region" description="Choose how Veyra displays language and numbers.">
      <SettingRow
        title="Language"
        description="The language used across the app."
        htmlFor="lang-language"
        control={
          <SettingSelect
            id="lang-language"
            options={LANGUAGE_OPTIONS}
            value={value.language}
            onChange={(e) => update({ language: e.target.value as LanguageRegionSettings["language"] })}
          />
        }
      />

      <SettingRow
        title="Currency"
        description="Default currency for balances and goals."
        htmlFor="lang-currency"
        control={
          <SettingSelect
            id="lang-currency"
            options={CURRENCY_OPTIONS}
            value={value.currency}
            onChange={(e) => update({ currency: e.target.value as LanguageRegionSettings["currency"] })}
          />
        }
      />

      <SettingRow
        title="Date format"
        description="How dates appear throughout Veyra."
        htmlFor="lang-date"
        control={
          <SettingSelect
            id="lang-date"
            options={DATE_FORMAT_OPTIONS}
            value={value.dateFormat}
            onChange={(e) => update({ dateFormat: e.target.value as LanguageRegionSettings["dateFormat"] })}
          />
        }
      />
    </SettingGroup>
  );
}
