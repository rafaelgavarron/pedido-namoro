'use client';

import React, { useState } from 'react';
import {
  Heart,
  PartyPopper,
  Stars,
  ArrowRight,
  HelpCircle,
  XCircle,
  ScrollText,
  Check,
} from 'lucide-react';

export default function App() {
  // --- CONFIGURAÇÃO DO QUIZ ---
  const questions = [
    {
      text: 'Quem é mais provável de comer o último pedaço de pizza?',
      options: [
        'Eu (Rafael)',
        'Você (Letícia)',
        'Dividimos sempre',
        'Quem pegar primeiro',
      ],
      correct: 0,
    },
    {
      text: 'Qual é a nossa atividade favorita quando a gente tá junto?',
      options: [
        'Ver filmes/séries',
        'Sair para comer',
        'Dormir de conchinha 👀',
        'Jogar',
      ],
      correct: 2,
    },
    {
      text: 'Quem é mais bagunceiro?',
      options: [
        'Nnhum dos dois',
        'Você (Letícia)',
        'Os dois igual',
        'Eu (Rafael)',
      ],
      correct: 3,
    },
    {
      text: 'Qual é o dia que a gente se conheceu pessoalmente?',
      options: [
        '20 de Julho',
        '18 de Julho',
        '19 de Julho',
        'Nenhuma das alternativas',
      ],
      correct: 0,
    },
    {
      text: 'Para finalizar: Qual frase/atitude sua é a minha favorita?',
      options: [
        '"Não tem base um trem desse não sô"',
        '*Dancinha quando ta comendo*',
        '"Um cadinho"',
        '"Guenta ai"',
      ],
      correct: 1,
    },
  ];

  // --- ESTADOS ---
  // Inicia no estágio 'terms'
  const [stage, setStage] = useState<
    'terms' | 'quiz' | 'proposal' | 'accepted'
  >('terms');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);

  // Estados do Pedido
  const [noCount, setNoCount] = useState(0);
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({});

  // --- LÓGICA DO QUIZ ---
  const handleAnswer = (idx: number) => {
    const question = questions[currentQuestion];
    const isCorrect = idx === question.correct;

    if (isCorrect) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setStage('proposal');
      }
    } else {
      setWrongIndex(idx);
      setTimeout(() => {
        setWrongIndex(null);
      }, 500);
    }
  };

  // --- LÓGICA DO PEDIDO ---
  const moveButton = () => {
    if (stage !== 'proposal') return;

    setNoCount((prev) => prev + 1);

    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 80;

    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);

    setNoBtnStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.3s ease',
      zIndex: 50,
    });
  };

  const handleYes = () => {
    setStage('accepted');
  };

  const handleAcceptTerms = () => {
    setStage('quiz');
  };

  // --- RENDERIZAÇÃO ---

  // 1. TELA DE TERMOS (NOVA)
  if (stage === 'terms') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-pink-200 max-w-lg w-full animate-in zoom-in duration-500">
          <div className="flex justify-center mb-6 text-pink-500">
            <ScrollText size={64} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center font-serif">
            Termos de Uso do Meu Coração
          </h1>

          <div className="bg-pink-50 rounded-xl p-6 mb-8 border border-pink-100 max-h-60 overflow-y-auto text-left text-gray-600 space-y-3 shadow-inner">
            <p className="font-semibold text-pink-600">
              Ao prosseguir, você concorda com:
            </p>
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-1"
                />
                <span>
                  Receber beijinhos e abraços ilimitados sem direito a
                  reclamação.
                </span>
              </li>
              <li className="flex gap-2">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-1"
                />
                <span>Dividir toda a comida que você não aguentar.</span>
              </li>
              <li className="flex gap-2">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-1"
                />
                <span>Aturar minhas piadas ruins para todo o sempre.</span>
              </li>
              <li className="flex gap-2">
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-1"
                />
                <span>Ser a namorada mais amada do mundo.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleAcceptTerms}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition hover:scale-105 flex justify-center items-center gap-2"
          >
            Li e Aceito os Termos <ArrowRight size={20} />
          </button>

          <p className="mt-4 text-xs text-gray-400 text-center">
            * Clicando acima você assina um contrato vitalício de amor.
          </p>
        </div>
      </div>
    );
  }

  // 2. TELA DE SUCESSO
  if (stage === 'accepted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-1000">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-4 border-pink-300 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="relative animate-bounce">
              <Heart className="w-24 h-24 text-red-500 fill-red-500" />
              <PartyPopper className="w-12 h-12 text-yellow-500 absolute -top-2 -right-4" />
              <Stars className="w-10 h-10 text-yellow-400 absolute top-0 -left-4" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4 font-serif">
            Ebaaaa! Ela disse SIM! <br />
            💖💍
          </h1>
          <p className="text-xl text-gray-700 mb-8">Te amo muito!</p>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Ursos se beijando"
            className="rounded-lg w-full h-full object-cover shadow-md"
          />
        </div>
      </div>
    );
  }

  // 3. TELA DO QUIZ
  if (stage === 'quiz') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-200 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-3xl shadow-2xl border-2 border-pink-100 animate-in slide-in-from-bottom-4 duration-500">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-center mb-4 text-pink-500">
            <HelpCircle size={48} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center min-h-[64px] flex items-center justify-center">
            {question.text}
          </h2>

          <div className="grid gap-3">
            {question.options.map((option, idx) => {
              const isWrong = wrongIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`
                    w-full py-4 px-6 rounded-xl font-semibold text-left flex justify-between items-center group transition-all duration-200 shadow-sm border-2
                    ${
                      isWrong
                        ? 'bg-red-100 border-red-400 text-red-600 animate-[shake_0.5s_ease-in-out]'
                        : 'bg-white border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-400 hover:scale-105'
                    }
                  `}
                >
                  {option}
                  {isWrong ? (
                    <XCircle className="text-red-500" size={20} />
                  ) : (
                    <ArrowRight
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400"
                      size={20}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Pergunta {currentQuestion + 1} de {questions.length}
          </div>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </div>
    );
  }

  // 4. TELA DO PEDIDO
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 overflow-hidden relative animate-in fade-in duration-1000">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full border-2 border-white z-10 relative">
        <div className="mb-6 flex justify-center">
          <img
            src="https://media.tenor.com/PHudkrwfKHgAAAAi/kawaii-cute.gif"
            alt="Cute gif"
            className="rounded-xl shadow-md w-48 h-48 object-cover"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2 font-serif">
          Agora a pergunta oficial...
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Aceita namorar comigo? 🥺👉👈 (Se você clicar no não você vai perceber
          que não é uma opção)
        </p>

        {/* Container dos botões */}
        <div className="flex justify-center items-center gap-4 min-h-[60px]">
          <button
            onClick={handleYes}
            className="relative z-20 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-110 text-xl flex items-center gap-2"
          >
            Sim! <Heart size={20} className="fill-white" />
          </button>

          <button
            onMouseEnter={moveButton}
            onClick={moveButton}
            style={noCount > 0 ? noBtnStyle : {}}
            className={`
              bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 text-xl
            `}
          >
            Não
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-400 font-mono h-6">
          {noCount > 0 && `Tentativas de fuga: ${noCount}`}
        </div>
      </div>
    </div>
  );
}
