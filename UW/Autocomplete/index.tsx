import React, { useId, useState } from "react";
import AutoPrediction from "./AutoPrediction";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  url: string;
  body: object;
  Popper: React.ReactNode;
  label: string;
  errorText: string;
  active: boolean;
  inputClass: string;
}

export default function Autocomplete({ label, errorText, active, className, children, ...props }: Props) {

  const [b, setB] = useState<boolean>()
  const id = useId()
  const err = b && Boolean(errorText) || active && Boolean(errorText)

  return (
    <div className={`mt-2 ${err ? 'error' : ''} ${className}`} >
      <label htmlFor={id}>{label}</label>
      {children}
      <AutoPrediction
        {...props}
        onBlur={() => setB(true)}
        id={id}
      />
      {err && <div className="ce">{errorText}</div>}
    </div>
  )
}
