'use client';

import React from 'react';
import { ApiEntry } from '@/data/types';
import {
  getDifficultyColor,
  getPricingColor,
  getAuthLabel,
  getPricingLabel,
} from '@/lib/utils';
import { Heart, ExternalLink, ArrowRight, Sparkles, Key } from 'lucide-react';

const AUTH_TOOLTIP: Record<string, string> = {
  "none": "No authentication required",
  "api-key": "Requires an API Key in the headers",
  "bearer": "Requires a Bearer Token",
  "oauth2": "Uses OAuth 2.0 protocol",
  "basic": "Requires HTTP Basic Auth credentials",
};

const DIFFICULTY_TOOLTIP: Record<string, string> = {
  "easy": "Simple to integrate and use",
  "moderate": "Moderate complexity, requires some setup",
  "advanced": "Complex integration, significant development effort required"
};

interface ApiCardProps {
  api: ApiEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (api: ApiEntry) => void;
}

export function ApiCard({
  api,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: ApiCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 p-5 shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300">
      {/* Top Header: Category & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-semibold capitalize text-zinc-600 dark:text-zinc-400">
            {api.category}
          </span>
          <div className="flex items-center gap-1.5">
            {/* Difficulty Badge */}
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${getDifficultyColor(
                api.difficulty
              )}`}
              title={DIFFICULTY_TOOLTIP[api.difficulty] || "Difficulty level"}
              aria-label={`Difficulty level: ${api.difficulty}`}
            >
              {api.difficulty}
            </span>

            {/* Pricing Badge */}
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${getPricingColor(
                api.pricing
              )}`}
              aria-label={`Pricing model: ${getPricingLabel(api.pricing)}`}
            >
              {getPricingLabel(api.pricing)}
            </span>
          </div>
        </div>

        {/* Title & Favorite Toggle */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            onClick={() => onSelect(api)}
            onKeyDown={(e) => handleKeyDown(e, () => onSelect(api))}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${api.name}`}
            className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition-colors focus:outline-none focus-visible:underline"
          >
            {api.name}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(api.id);
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 transition-transform group-active:scale-125 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3.5">
          {api.description}
        </p>

        {/* API Translator Highlight Card */}
        <div
          onClick={() => onSelect(api)}
          onKeyDown={(e) => handleKeyDown(e, () => onSelect(api))}
          role="button"
          tabIndex={0}
          aria-label={`View translator snippet for ${api.name}`}
          className="cursor-pointer rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/40 p-3 mb-4 transition-all hover:bg-blue-50 dark:hover:bg-blue-950/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-400 mb-1">
            <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            <span>API Translator Snippet</span>
          </div>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium line-clamp-2">
            &ldquo;{api.apiTranslator.whatItDoes}&rdquo;
          </p>
        </div>

        {/* Auth & Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span 
            title={AUTH_TOOLTIP[api.auth] || "Authentication method"}
            aria-label={`Authentication method: ${getAuthLabel(api.auth)}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200/60 dark:border-zinc-700/60"
          >
            <Key className="h-2.5 w-2.5" />
            <span>{getAuthLabel(api.auth)}</span>
          </span>
          {api.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800"
              aria-label={`Tag: ${tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
        {/* External Docs Link */}
        <a
          href={api.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          title="Official documentation"
          aria-label={`Open official documentation for ${api.name} in a new tab`}
        >
          <span>Docs</span>
          <ExternalLink className="h-3 w-3" />
        </a>

        {/* Primary Action Button */}
        <button
          onClick={() => onSelect(api)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-500/20"
          aria-label={`Open translator for ${api.name}`}
        >
          <span>Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
