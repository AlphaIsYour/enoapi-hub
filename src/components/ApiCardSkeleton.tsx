'use client';

import React from 'react';

export function ApiCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 p-5 shadow-sm animate-pulse">    
      {/* Top Header: Category & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category Tag */}
          <div className="h-5 w-16 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            {/* Difficulty Badge */}
            <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            {/* Pricing Badge */}
            <div className="h-5 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* Title & Favorite Toggle */}
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Title */}
          <div className="h-6 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
          {/* Favorite Button */}
          <div className="h-7 w-7 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Short Description (2 Lines) */}
        <div className="space-y-2 mb-3.5 mt-2">
          <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* API Translator Highlight Card */}
        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 p-3 mb-4">
          {/* Highlight Title */}
          <div className="h-3 w-28 rounded bg-zinc-200/80 dark:bg-zinc-800/60 mb-2" />
          {/* Highlight Text Lines */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-full rounded bg-zinc-200/80 dark:bg-zinc-800/60" />
            <div className="h-3.5 w-2/3 rounded bg-zinc-200/80 dark:bg-zinc-800/60" />
          </div>
        </div>

        {/* Auth & Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {/* Auth Tag */}
          <div className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
          {/* Sub-tags */}
          <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
      {/* Card Footer: Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
        {/* External Docs Link */}
        <div className="h-4 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />
        
        {/* Primary Action Button */}
        <div className="h-7 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>

    </div>
  );
}
