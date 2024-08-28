import { FC } from "react";

import Card from "../card/Card";

import "./CardWrapper.scss";

const cards = [
  {
    count: 1,
    amount: 4000000,
    termInMonth: 2,
    monthlyPayment: 12,
  },

  { count: 2, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  { count: 3, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  { count: 4, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  { count: 5, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  { count: 6, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  // { count: 7, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  // { count: 8, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },
];

const CardWrapper: FC = () => {
  return (
    <div className={cards.length > 6 ? "card-wrapper long" : "card-wrapper"}>
      <div className="card-wrapper-left">
        {cards.map((card, index) => {
          if (index % 2 === 0) {
            return (
              <Card
                key={index + 1}
                count={card.count}
                amount={card.amount}
                termInMonth={card.termInMonth}
                monthlyPayment={card.monthlyPayment}
                delay={index < 6 ? (index === 0 ? 100 : (index / 2) * 150) : 0}
                isLeft={true}
              />
            );
          }
        })}
      </div>
      <div className="card-wrapper-right">
        {cards.map((card, index) => {
          if (index % 2 !== 0) {
            return (
              <Card
                key={index + 1}
                count={card.count}
                amount={card.amount}
                termInMonth={card.termInMonth}
                monthlyPayment={card.monthlyPayment}
                delay={
                  index < 6
                    ? index === 1
                      ? 100
                      : Math.ceil(index / 2) * 150
                    : 0
                }
                isLeft={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default CardWrapper;
