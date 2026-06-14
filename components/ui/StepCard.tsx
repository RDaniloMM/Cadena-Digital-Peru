"use client";

import { Card } from "./Card";

export type StepCardOption = {
  value: string;
  label: string;
};

export type StepCardProps = {
  question: string;
  options?: StepCardOption[];
  value?: string | boolean;
  onChange: (value: string | boolean) => void;
  name: string;
};

export function StepCard({
  question,
  options,
  value,
  onChange,
  name,
}: StepCardProps) {
  const isBoolean = !options;

  return (
    <Card className="w-full">
      <fieldset>
        <legend className="mb-6 text-xl font-semibold text-lumia-navy sm:text-2xl">
          {question}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {isBoolean ? (
            <BooleanOptions name={name} value={value} onChange={onChange} />
          ) : (
            options.map((option) => (
              <RadioOption
                key={option.value}
                name={name}
                option={option}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
            ))
          )}
        </div>
      </fieldset>
    </Card>
  );
}

function RadioOption({
  name,
  option,
  checked,
  onChange,
}: {
  name: string;
  option: StepCardOption;
  checked: boolean;
  onChange: () => void;
}) {
  const id = `${name}-${option.value}`;
  return (
    <label
      htmlFor={id}
      className={[
        "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
        "hover:border-lumia-cyan hover:bg-lumia-sky/50",
        checked
          ? "border-lumia-cyan bg-lumia-sky"
          : "border-lumia-navy/10 bg-lumia-white",
      ].join(" ")}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-lumia-navy"
      />
      <span className="text-base font-medium text-lumia-ink">
        {option.label}
      </span>
    </label>
  );
}

function BooleanOptions({
  name,
  value,
  onChange,
}: {
  name: string;
  value?: string | boolean;
  onChange: (value: string | boolean) => void;
}) {
  const options: StepCardOption[] = [
    { value: "true", label: "Sí, tengo el original" },
    { value: "false", label: "No, tengo una copia" },
  ];

  return (
    <>
      {options.map((option) => (
        <RadioOption
          key={option.value}
          name={name}
          option={option}
          checked={String(value) === option.value}
          onChange={() => onChange(option.value === "true")}
        />
      ))}
    </>
  );
}
