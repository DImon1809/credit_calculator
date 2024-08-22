import {
  FC,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import "./RangeInput.scss";

export interface IRangeInput {
  rangeText: string;
  preId: string;
  min: string;
  max: string;
  defaultValue?: string;
  pointBegin: string;
  pointMedium: string;
  pointEnd: string;
  isDate: boolean;
  externalValue: string;
  setExternalValue: Dispatch<SetStateAction<string>>;
}

const RangeInput: FC<IRangeInput> = ({
  rangeText,
  preId,
  min,
  max,
  defaultValue,
  pointBegin,
  pointMedium,
  pointEnd,
  isDate,
  externalValue,
  setExternalValue,
}) => {
  const rangeRef = useRef<HTMLInputElement>(null);

  const [rangeValue, setRangeValue] = useState<number>(0);

  const handleSumInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (rangeRef.current) {
      let coordX: number = Number(event.target.value);

      rangeRef.current.style.background = `linear-gradient(90deg, #00aae6 ${coordX}%, #fff ${coordX}%)`;

      setRangeValue(coordX);

      if (!isDate) {
        const result: string = `${coordX === 0 ? 100000 : coordX * 400000}`
          .split("")
          .reverse()
          .map((char, id) => (id % 3 === 0 ? `${char} ` : char))
          .reverse()
          .join("");

        return setExternalValue(result + " ₽");
      }

      if (isDate) {
        if (coordX === 0) return setExternalValue("6 месяцев");

        let months: number | string = Math.ceil(coordX * 0.78) + 6;
        let years: number | string = Math.floor(months / 12);

        if (years === 0) {
          years = "";
          months = months + " месяцев";
        } else {
          months = months - years * 12;

          months = months === 0 ? "" : `${months} месяцев`;

          if (years === 1) years = `${years} год`;

          if (+years < 5 && +years > 1) years = `${years} года`;

          if (+years > 4 && +years <= 7) years = `${years} лет`;
        }

        return setExternalValue(`${years} ${months}`);
      }
    }
  };

  return (
    <div className="range-input-wrapper">
      <input
        type="range"
        name="range-input"
        id={`range-input-${preId}`}
        className="range-input"
        min={min}
        max={max}
        value={rangeValue}
        onChange={handleSumInput}
        ref={rangeRef}
      />
      <label htmlFor={`range-input-${preId}`}>{rangeText}</label>
      <div className="value-wrapper">
        <p>{externalValue}</p>
      </div>
      <div className="input-points">
        <ul>
          <li className="point">{pointBegin}</li>
          <li className="point">{pointMedium}</li>
          <li className="point">{pointEnd}</li>
        </ul>
      </div>
    </div>
  );
};

export default RangeInput;
