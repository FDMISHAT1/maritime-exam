"use client";

import { useMemo, useState } from "react";

type Question = {
  id: number;
  text: string;
  answers: string[];
  correct: number[];
};

const QUESTIONS: Question[] = [
  { id: 1, text: "Буква «С» в условном обозначении двигателя по ГОСТ 10150-2014 означает:", answers: ["С редукторной передачей", "С самовоспламенением топливно-воздушной смеси", "С реверс-редукторной передачей", "С реверсивной муфтой", "С наддувом"], correct: [3] },
  { id: 2, text: "Буква «П» в условном обозначении двигателя по ГОСТ 10150-2014 означает:", answers: ["С редукторной передачей", "Простого действия", "С реверс-редукторной передачей", "С реверсивной муфтой", "С петлевой продувкой камеры сгорания"], correct: [0] },
  { id: 3, text: "Какая буква соответствует двигателю, не являющемуся тронковым?", answers: ["К", "Н", "Т", "П", "Д"], correct: [0] },
  { id: 5, text: "Степень сжатия — это:", answers: ["Отношение полного объёма цилиндра к объёму камеры сжатия", "Отношение полного объёма цилиндра к его рабочему объёму", "Отношение рабочего объёма цилиндра к объёму камеры сжатия", "Отношение рабочего объёма цилиндра к его полному объёму", "Отношение объёма камеры сжатия к полному объёму цилиндра"], correct: [0] },
  { id: 6, text: "Рабочий объём цилиндра — это:", answers: ["Объём, описываемый поршнем при перемещении от одного крайнего положения до другого", "Объём цилиндра над поршнем в нижней мёртвой точке", "Объём цилиндра над поршнем в верхней мёртвой точке", "Сумма объёма камеры сжатия и полного объёма цилиндра"], correct: [0] },
  { id: 8, text: "Какое количество поршневых колец соответствует лучшему с точки зрения механической эффективности двигателю?", answers: ["Три", "Четыре", "Пять", "Шесть", "Восемь"], correct: [0] },
  { id: 10, text: "Каждый двигатель с агрегатным наддувом имеет:", answers: ["Турбину", "Турбокомпрессор", "Компрессор", "Охладитель наддувочного воздуха", "Турбонагнетатель"], correct: [2] },
  { id: 12, text: "В каком порядке происходит смазывание указанных подшипников?", answers: ["Коренной (рамовый) — шатунный — головной", "Шатунный — головной — коренной", "Головной — коренной — шатунный", "Шатунный — коренной — головной", "Головной — шатунный — коренной"], correct: [0] },
  { id: 13, text: "Какие утверждения о системе смазывания истинны?", answers: ["Снижает трение между трущимися деталями", "Охлаждает детали трения", "Очищает детали трения от загрязнений", "Может использоваться для охлаждения поршней"], correct: [0, 1, 2, 3] },
  { id: 14, text: "Максиметр служит для:", answers: ["Определения давления сжатия и сгорания в цилиндре дизеля", "Определения максимальной температуры цикла", "Определения средних по цилиндрам давления сжатия и сгорания", "Определения максимальной температуры отработавших газов", "Определения среднего индикаторного давления цилиндра"], correct: [0] },
  { id: 16, text: "Как повлияет вязкость судового маловязкого топлива на давление сжатия при замене дизельного топлива?", answers: ["Давление сжатия не изменится", "Повысится из-за малой вязкости", "Понизится из-за малой вязкости", "Повысится из-за высокой вязкости", "Понизится из-за высокой вязкости"], correct: [0] },
  { id: 17, text: "Чем опасен уход двигателя «в разнос»?", answers: ["Увеличением сил инерции движущихся деталей", "Перегревом деталей цилиндро-поршневой группы", "Увеличением крутящего момента", "Снижением экономичности", "Увеличением крутильных колебаний"], correct: [0] },
  { id: 18, text: "Какой элемент двигателя управляет цикловой подачей топлива?", answers: ["Регулятор частоты вращения", "Топливный насос высокого давления", "Форсунка", "Топливная рейка"], correct: [0] },
  { id: 19, text: "Опережение открытия выпускного клапана позволяет:", answers: ["Уменьшить потери мощности на выталкивание газов из цилиндра", "Обеспечить дозарядку цилиндра", "Обеспечить продувку цилиндра"], correct: [0] },
  { id: 20, text: "Раннее открытие впускного клапана позволяет:", answers: ["Уменьшить потери мощности на выталкивание газов", "Обеспечить дозарядку цилиндра", "Улучшить очистку цилиндра от отработавших газов"], correct: [2] },
  { id: 23, text: "Назовите устройство, передающее вращение за счёт силы трения скольжения:", answers: ["Фрикционная муфта", "Гидравлическая муфта", "Гидротрансформатор", "Пневматическая муфта", "Промежуточный вал"], correct: [0] },
  { id: 24, text: "У редукторов какого типа входной и выходной валы всегда соосны?", answers: ["Планетарный редуктор", "Червячный редуктор", "Редуктор с цилиндрической зубчатой передачей", "Редуктор с конической зубчатой передачей"], correct: [0] },
  { id: 25, text: "Для восприятия какого вида нагружения служат призонные болты?", answers: ["Срез", "Растяжение", "Сжатие", "Изгиб", "Кручение"], correct: [0] },
  { id: 27, text: "Какой прибор может использоваться для измерения температуры?", answers: ["Максиметр", "Пиметр", "Планиметр", "Курвиметр", "Пирометр"], correct: [4] },
  { id: 28, text: "Какой прибор измеряет среднее по времени давление в цилиндре дизеля?", answers: ["Максиметр", "Пиметр", "Планиметр", "Курвиметр", "Пирометр"], correct: [1] },
  { id: 30, text: "Наиболее точно оценить степень загрязнения фильтра системы смазывания позволяет:", answers: ["Падение давления после фильтра", "Увеличение давления после фильтра", "Падение давления перед фильтром", "Увеличение давления перед фильтром", "Увеличение перепада давления на фильтре"], correct: [4] },
  { id: 32, text: "Четырёхклапанные крышки цилиндров современных дизелей позволяют:", answers: ["Улучшить протекание процессов газообмена", "Повысить надёжность клапанов", "Уменьшить нагарообразование", "Использовать тяжёлые сорта топлива"], correct: [0] },
  { id: 33, text: "На стыке каких тактов четырёхтактного дизеля с наддувом происходит продувка?", answers: ["Впуск — сжатие", "Сжатие — рабочий ход", "Рабочий ход — выпуск", "Выпуск — впуск"], correct: [3] },
  { id: 34, text: "Могут ли плунжерные пары ТНВД двигателя левой модели устанавливаться на двигатель правой модели?", answers: ["Да, без дополнительных манипуляций", "Да, после проверки нулевой подачи", "Да, после замены втулки", "Да, при совпадении направления вращения", "Нет, не могут"], correct: [4] },
  { id: 43, text: "Если в цилиндр впрыснуть меньше топлива:", answers: ["Работа цикла уменьшится", "Работа цикла увеличится", "Работа цикла останется неизменной"], correct: [0] },
  { id: 44, text: "Причиной чёрного цвета выпускных газов двигателя является:", answers: ["Неполное сгорание топлива с образованием сажистых частиц", "Попадание масла в камеру сгорания", "Попадание воды в камеру сгорания", "Избыточное количество воздуха"], correct: [0] },
  { id: 47, text: "Система смазывания двигателя служит для:", answers: ["Смазывания поверхностей трения", "Охлаждения деталей и узлов", "Удаления из зон трения продуктов изнашивания", "Удаления продуктов сгорания из цилиндра"], correct: [0, 1, 2] },
  { id: 58, text: "Регулировка форсунок и замена их во время работы дизеля:", answers: ["Запрещается", "Разрешается при соблюдении мер безопасности", "Разрешается под контролем старшего механика"], correct: [0] },
  { id: 70, text: "Сколько градусов поворота коленчатого вала составляет рабочий цикл двухтактного двигателя?", answers: ["720°", "360°", "180°", "540°", "270°"], correct: [1] },
  { id: 100, text: "Какова величина частоты переменного тока, применяемого в отечественных электросетях?", answers: ["50 Гц", "220 В", "60 Вт", "16 А", "24 В"], correct: [0] },
];

type Screen = "start" | "quiz" | "result";

function sameAnswers(selected: number[], correct: number[]) {
  return selected.length === correct.length && selected.every((item) => correct.includes(item));
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [testLength, setTestLength] = useState(20);
  const [order, setOrder] = useState<number[]>([]);
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [savedMistakes, setSavedMistakes] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("maritime-exam-mistakes");
    return saved ? JSON.parse(saved) : [];
  });

  const question = QUESTIONS.find((item) => item.id === order[position]);
  const percent = order.length ? Math.round((position / order.length) * 100) : 0;
  const isMultiple = (question?.correct.length ?? 0) > 1;
  const isRight = question ? sameAnswers(selected, question.correct) : false;

  const mistakeQuestions = useMemo(
    () => QUESTIONS.filter((item) => savedMistakes.includes(item.id)),
    [savedMistakes],
  );

  function begin(source: Question[], limit = source.length) {
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, limit);
    setOrder(shuffled.map((item) => item.id));
    setPosition(0);
    setSelected([]);
    setConfirmed(false);
    setCorrectCount(0);
    setMistakes([]);
    setScreen("quiz");
  }

  function toggleAnswer(index: number) {
    if (confirmed) return;
    if (!isMultiple) {
      setSelected([index]);
      return;
    }
    setSelected((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  function checkAnswer() {
    if (!question || selected.length === 0) return;
    setConfirmed(true);
    if (sameAnswers(selected, question.correct)) {
      setCorrectCount((value) => value + 1);
    } else {
      setMistakes((value) => [...value, question.id]);
    }
  }

  function nextQuestion() {
    if (position + 1 >= order.length) {
      const merged = [...new Set([...savedMistakes.filter((id) => !order.includes(id)), ...mistakes])];
      setSavedMistakes(merged);
      localStorage.setItem("maritime-exam-mistakes", JSON.stringify(merged));
      setScreen("result");
      return;
    }
    setPosition((value) => value + 1);
    setSelected([]);
    setConfirmed(false);
  }

  function clearMistakes() {
    setSavedMistakes([]);
    localStorage.removeItem("maritime-exam-mistakes");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen("start")} aria-label="На главную">
          <span className="brand-mark">⚓</span>
          <span><b>Морской зачёт</b><small>тренажёр для подготовки</small></span>
        </button>
        <span className="question-total">{QUESTIONS.length} вопросов в базе</span>
      </header>

      {screen === "start" && (
        <section className="start-card">
          <div className="eyebrow">Подготовка без зубрёжки</div>
          <h1>Готова проверить знания?</h1>
          <p className="lead">Выбирай ответы, сразу разбирай ошибки и возвращайся к сложным вопросам.</p>
          <div className="length-picker" aria-label="Количество вопросов в тесте">
            <span>Вопросов в тесте</span>
            <div>
              {[10, 20, 50].map((length) => (
                <button
                  key={length}
                  className={testLength === length ? "active" : ""}
                  disabled={length > QUESTIONS.length}
                  onClick={() => setTestLength(length)}
                >
                  {length}
                </button>
              ))}
              <button
                className={testLength === QUESTIONS.length ? "active" : ""}
                onClick={() => setTestLength(QUESTIONS.length)}
              >
                Все
              </button>
            </div>
          </div>
          <div className="mode-grid">
            <button className="mode-card primary" onClick={() => begin(QUESTIONS, Math.min(testLength, QUESTIONS.length))}>
              <span className="mode-icon">▶</span>
              <b>Начать тест</b>
              <small>{Math.min(testLength, QUESTIONS.length)} случайных вопросов</small>
            </button>
            <button className="mode-card" onClick={() => begin(QUESTIONS)}>
              <span className="mode-icon">∞</span>
              <b>Все вопросы</b>
              <small>Полная тренировка</small>
            </button>
            <button className="mode-card" disabled={!mistakeQuestions.length} onClick={() => begin(mistakeQuestions)}>
              <span className="mode-icon">↻</span>
              <b>Работа над ошибками</b>
              <small>{mistakeQuestions.length ? `${mistakeQuestions.length} вопросов` : "Пока ошибок нет"}</small>
            </button>
          </div>
          <div className="tip"><span>💡</span><p><b>В некоторых вопросах несколько ответов.</b> Программа предупредит об этом.</p></div>
          {!!mistakeQuestions.length && <button className="text-button" onClick={clearMistakes}>Очистить список ошибок</button>}
        </section>
      )}

      {screen === "quiz" && question && (
        <section className="quiz-wrap">
          <div className="quiz-meta">
            <span>Вопрос {position + 1} из {order.length}</span>
            <span>{percent}%</span>
          </div>
          <div className="progress"><span style={{ width: `${percent}%` }} /></div>
          <article className="question-card">
            <div className="question-number">№ {question.id}</div>
            <h2>{question.text}</h2>
            {isMultiple && <p className="multiple-note">Выбери несколько вариантов</p>}
            <div className="answers">
              {question.answers.map((answer, index) => {
                const active = selected.includes(index);
                const correct = confirmed && question.correct.includes(index);
                const wrong = confirmed && active && !question.correct.includes(index);
                return (
                  <button
                    key={answer}
                    className={`answer ${active ? "active" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                    onClick={() => toggleAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <b>{answer}</b>
                    {correct && <i>✓</i>}
                    {wrong && <i>×</i>}
                  </button>
                );
              })}
            </div>
            {confirmed && (
              <div className={`feedback ${isRight ? "ok" : "error"}`}>
                <b>{isRight ? "Верно!" : "Неверно"}</b>
                <span>{isRight ? "Отлично, так держать." : "Правильный ответ отмечен зелёным."}</span>
              </div>
            )}
            <button className="main-button" disabled={!selected.length} onClick={confirmed ? nextQuestion : checkAnswer}>
              {confirmed ? (position + 1 === order.length ? "Завершить тест" : "Следующий вопрос") : "Ответить"}
            </button>
          </article>
        </section>
      )}

      {screen === "result" && (
        <section className="result-card">
          <div className="result-ring"><b>{Math.round((correctCount / order.length) * 100)}%</b><span>результат</span></div>
          <h1>{correctCount === order.length ? "Идеально!" : correctCount / order.length >= 0.8 ? "Очень хорошо!" : "Продолжаем тренировку"}</h1>
          <p>Правильных ответов: <b>{correctCount} из {order.length}</b></p>
          <div className="result-actions">
            <button className="main-button" onClick={() => begin(QUESTIONS, Math.min(testLength, QUESTIONS.length))}>Пройти ещё раз</button>
            <button className="secondary-button" onClick={() => setScreen("start")}>На главную</button>
          </div>
        </section>
      )}
      <footer>Данные сохраняются только на этом устройстве</footer>
    </main>
  );
}
