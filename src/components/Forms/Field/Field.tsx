import { useState } from "react";
import "./Field.css";

export default function Field(params: any) {
  const [showPassword, _setShowPassword] = useState(false);

  return (
    <div className="field">
      <label className="label-form">{params.name}</label>
      <div className="input-container">
        <input
          className="div"
          placeholder={`Enter ${params.placeHolder}`}
          type={
            params.type === "password" && !showPassword ? "password" : "text"
          }
          value={params.value}
          onChange={(e) => {
            params.setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
