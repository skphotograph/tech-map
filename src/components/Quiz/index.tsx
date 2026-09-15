import type {ReactNode} from 'react';
import {useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type QuizOption = {
  id: string;
  label: ReactNode;
};

type QuizShellProps = {
  title: string;
  children: ReactNode;
  result: ReactNode | null;
  defaultOpen?: boolean;
};

function QuizShell({title, children, result, defaultOpen = false}: QuizShellProps) {
  return (
    <section className={styles.quiz} aria-label={`理解チェック: ${title}`}>
      <details className={styles.questionFold} open={defaultOpen || undefined}>
        <summary className={styles.questionSummary}>
          <span className={styles.badge}>問題</span>
          <span className={styles.summaryTitle}>理解チェック: {title}</span>
        </summary>
        <div className={styles.questionBody}>{children}</div>
      </details>

      {result != null ? (
        <details className={styles.answerFold} open>
          <summary className={styles.answerSummary}>
            <span className={styles.badge}>回答・解説</span>
            <span className={styles.summaryTitle}>結果を確認する</span>
          </summary>
          <div className={styles.answerBody}>{result}</div>
        </details>
      ) : null}
    </section>
  );
}

type ResultPanelProps = {
  correct: boolean;
  yourAnswer: ReactNode;
  correctAnswer: ReactNode;
  explanation: ReactNode;
  onRetry: () => void;
};

function ResultPanel({
  correct,
  yourAnswer,
  correctAnswer,
  explanation,
  onRetry,
}: ResultPanelProps) {
  return (
    <div
      className={clsx(styles.result, correct ? styles.resultCorrect : styles.resultWrong)}
      role="status">
      <p className={styles.resultHeadline}>
        {correct ? '正解です' : '不正解です'}
      </p>
      <dl className={styles.resultMeta}>
        <div>
          <dt>あなたの回答</dt>
          <dd>{yourAnswer}</dd>
        </div>
        <div>
          <dt>正解</dt>
          <dd>{correctAnswer}</dd>
        </div>
      </dl>
      <div className={styles.explanation}>
        <p className={styles.explanationLabel}>解説</p>
        <div className={styles.explanationBody}>{explanation}</div>
      </div>
      <button type="button" className={styles.secondaryButton} onClick={onRetry}>
        やり直す
      </button>
    </div>
  );
}

export type QuizChoiceProps = {
  title: string;
  options: QuizOption[];
  answer: string;
  explanation: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
};

export function QuizChoice({
  title,
  options,
  answer,
  explanation,
  children,
  defaultOpen = false,
}: QuizChoiceProps) {
  const groupId = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correctOption = useMemo(
    () => options.find((option) => option.id === answer),
    [options, answer],
  );
  const selectedOption = useMemo(
    () => options.find((option) => option.id === selected),
    [options, selected],
  );
  const correct = submitted && selected === answer;

  const handleSubmit = () => {
    if (selected == null) {
      return;
    }
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <QuizShell
      title={title}
      defaultOpen={defaultOpen}
      result={
        submitted && selectedOption && correctOption ? (
          <ResultPanel
            correct={correct}
            yourAnswer={selectedOption.label}
            correctAnswer={correctOption.label}
            explanation={explanation}
            onRetry={handleRetry}
          />
        ) : null
      }>
      <div className={styles.prompt}>{children}</div>
      <fieldset className={styles.options} disabled={submitted}>
        <legend className={styles.srOnly}>選択肢</legend>
        {options.map((option) => {
          const inputId = `${groupId}-${option.id}`;
          return (
            <label key={option.id} className={styles.option} htmlFor={inputId}>
              <input
                id={inputId}
                type="radio"
                name={groupId}
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
              />
              <span className={styles.optionLabel}>{option.label}</span>
            </label>
          );
        })}
      </fieldset>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSubmit}
          disabled={selected == null || submitted}>
          回答する
        </button>
      </div>
    </QuizShell>
  );
}

function normalizeAnswer(value: string, caseSensitive: boolean): string {
  let normalized = value.trim().replace(/\s+/g, ' ');
  // 拡張子の先頭ドットは無視（.class / class を同じとみなす）
  if (normalized.startsWith('.')) {
    normalized = normalized.slice(1);
  }
  return caseSensitive ? normalized : normalized.toLowerCase();
}

export type QuizFillProps = {
  title: string;
  /** 正解。複数ある場合はいずれか一致で正解 */
  answer: string | string[];
  explanation: ReactNode;
  children?: ReactNode;
  placeholder?: string;
  caseSensitive?: boolean;
  defaultOpen?: boolean;
};

export function QuizFill({
  title,
  answer,
  explanation,
  children,
  placeholder = 'ここに入力',
  caseSensitive = false,
  defaultOpen = false,
}: QuizFillProps) {
  const inputId = useId();
  const accepted = useMemo(
    () => (Array.isArray(answer) ? answer : [answer]),
    [answer],
  );
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const correct =
    submitted &&
    accepted.some(
      (candidate) =>
        normalizeAnswer(value, caseSensitive) ===
        normalizeAnswer(candidate, caseSensitive),
    );

  const handleSubmit = () => {
    if (value.trim() === '') {
      return;
    }
    setSubmitted(true);
  };

  const handleRetry = () => {
    setValue('');
    setSubmitted(false);
  };

  const correctDisplay = accepted.join(' / ');

  return (
    <QuizShell
      title={title}
      defaultOpen={defaultOpen}
      result={
        submitted ? (
          <ResultPanel
            correct={correct}
            yourAnswer={value.trim() === '' ? '（未入力）' : value}
            correctAnswer={correctDisplay}
            explanation={explanation}
            onRetry={handleRetry}
          />
        ) : null
      }>
      <div className={styles.prompt}>{children}</div>
      <div className={styles.fillRow}>
        <label className={styles.fillLabel} htmlFor={inputId}>
          答え
        </label>
        <input
          id={inputId}
          className={styles.fillInput}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={submitted}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSubmit}
          disabled={value.trim() === '' || submitted}>
          回答する
        </button>
      </div>
    </QuizShell>
  );
}
