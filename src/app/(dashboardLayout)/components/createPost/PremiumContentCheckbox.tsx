"use client";
import { Checkbox } from "@nextui-org/react";

const PremiumContentCheckbox = ({ isPremium, onTogglePremium }) => (
  <Checkbox
    checked={isPremium}
    onChange={onTogglePremium}
    label="Mark as Premium Content"
  />
);

export default PremiumContentCheckbox;
