const DEFAULT_FONT_SIZE = "15pt";

const FONT_SIZES = [
  "9pt",
  "10pt",
  "11pt",
  "12pt",
  "14pt",
  "15pt",
  "16pt",
  "18pt",
  "20pt",
  "24pt",
  "28pt",
  "32pt",
  "36pt",
  "48pt",
  "60pt",
  "72pt",
];

export default function FontSizeSelect() {
  return (
    <select class="toolSelect" title="字号">
      <option value="">{DEFAULT_FONT_SIZE}</option>
      {FONT_SIZES.map((size) => (
        <option value={size}>{size}</option>
      ))}
    </select>
  );
}
