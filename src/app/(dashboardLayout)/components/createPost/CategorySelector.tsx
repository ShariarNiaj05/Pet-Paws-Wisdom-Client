import { Select } from "@nextui-org/react";

const CategorySelector = ({ onCategoryChange }) => (
  <Select
    label="Category"
    placeholder="Select Category"
    onChange={(e) => onCategoryChange(e.target.value)}
  >
    <option value="Tip">Tip</option>
    <option value="Story">Story</option>
  </Select>
);
export default CategorySelector;
