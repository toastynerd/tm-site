'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface EmailRevealProps {
  email: string;
}

export default function EmailReveal({ email }: EmailRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, operator: '+' });

  // Basic obfuscation - split email into parts and join with a special character
  const obfuscatedEmail = email.split('@').join(' [at] ');

  const generateMathProblem = () => {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setMathProblem({ num1, num2, operator });
  };

  const handleInitialClick = () => {
    setShowCaptcha(true);
    generateMathProblem();
  };

  const handleCaptchaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctAnswer;
    
    switch (mathProblem.operator) {
      case '+':
        correctAnswer = mathProblem.num1 + mathProblem.num2;
        break;
      case '-':
        correctAnswer = mathProblem.num1 - mathProblem.num2;
        break;
      case '×':
        correctAnswer = mathProblem.num1 * mathProblem.num2;
        break;
      default:
        correctAnswer = 0;
    }

    if (parseInt(captchaAnswer) === correctAnswer) {
      setIsRevealed(true);
      setShowCaptcha(false);
      // Create a temporary link to copy the email
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.click();
    } else {
      setCaptchaError(true);
      generateMathProblem();
      setCaptchaAnswer('');
    }
  };

  if (isRevealed) {
    return (
      <button
        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center gap-2"
        title="Email address"
      >
        <span className="sr-only">Email</span>
        <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-sm">{obfuscatedEmail}</span>
      </button>
    );
  }

  if (showCaptcha) {
    return (
      <form onSubmit={handleCaptchaSubmit} className="flex items-center gap-2">
        <span className="text-sm text-gray-400">
          {mathProblem.num1} {mathProblem.operator} {mathProblem.num2} =
        </span>
        <input
          type="number"
          value={captchaAnswer}
          onChange={(e) => setCaptchaAnswer(e.target.value)}
          className="w-16 rounded-md border-0 px-2 py-1 text-sm text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800"
          placeholder="?"
        />
        {captchaError && (
          <span className="text-sm text-red-500">Incorrect, try again</span>
        )}
      </form>
    );
  }

  return (
    <button
      onClick={handleInitialClick}
      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center gap-2"
      title="Click to reveal email"
    >
      <span className="sr-only">Email</span>
      <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
      <span className="text-sm">Click to reveal email</span>
    </button>
  );
} 