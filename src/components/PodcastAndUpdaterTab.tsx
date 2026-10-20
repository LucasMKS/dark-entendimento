import React from 'react';
import { PODCAST_RULES_AND_LORE, World, CharacterVariant } from '../data/multiverseData';
import { RichText } from './RichText';

interface PodcastAndUpdaterTabProps {
  worlds: World[];
  variants: CharacterVariant[];
}

export const PodcastAndUpdaterTab: React.FC<PodcastAndUpdaterTabProps> = ({
  worlds,
  variants,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#c89d54]/25 pb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 border border-[#c89d54]/40 bg-[#07080c] text-[#c89d54] font-display text-sm">
            <span>V</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c89d54]">
              ARQUIVO CANÔNICO // THE OFFICIAL APPLE TV+ PODCAST & BLAKE CROUCH
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-[0.14em] mt-0.5">
              Leis da Caixa & Regras do Multiverso
            </h2>
          </div>
        </div>

        <div className="px-4 py-2 bg-[#07080c] border border-[#c89d54]/30 text-xs font-mono text-stone-300 self-start lg:self-auto">
          <span className="text-[#c89d54] font-bold">{worlds.length}</span> Mundos •{' '}
          <span className="text-[#c89d54] font-bold">{variants.length}</span> Variantes Catalogadas
        </div>
      </div>

      {/* Podcast Rules & Lore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {PODCAST_RULES_AND_LORE.map((item, idx) => (
          <div
            key={idx}
            className="arch-box p-4 sm:p-6 flex flex-col justify-between transition hover:border-[#c89d54]/70"
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c89d54] block mb-2">
                {item.speaker}
              </span>
              <h3 className="font-display text-lg text-white uppercase tracking-wider mb-2.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                <RichText text={item.explanation} />
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-stone-400">
              <span>FONTE OFICIAL:</span>
              <span className="text-[#e6c885]">The Official Apple TV+ Podcast</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
