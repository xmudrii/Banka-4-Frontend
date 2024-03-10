import React from "react";

type Props = {
  value: string;
  onChange: (e: any) => void;
  onBlur: any;
};

const PasswordInput = ({ value, onChange, onBlur }: Props) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <label htmlFor="password">Polje za unos nove šifre:</label>
      <input
        type="password"
        id="password"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default PasswordInput;
