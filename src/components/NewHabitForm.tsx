import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const NewHabitForm = () => {
  const [title, setTitle] = useState("");
  const [weekdays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    // console.log(title, weekDays);

    if (!title || weekdays.length === 0) {
      return;
    }
    const createHabit = await api.post("habits", {
      title,
      weekdays,
    });

    setTitle("");
    setWeekDays([]);

    console.log(createHabit);
    alert("Criado com sucesso!");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekdays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekdays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekdays, weekDay];

      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual é seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-800"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="description" className="font-semibold leading-tight mt-4">
        Qual é a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekday, index) => {
          return (
            <Checkbox.Root
              key={weekday + index}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekdays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center  group-data-[state=unchecked]:bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]: bg-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{weekday}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};