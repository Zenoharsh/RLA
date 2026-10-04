"use client";
import { useState } from "react";

export default function EnrollmentForm() {
  const [enrolled, setEnrolled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolled(true);
  };

  return (
    <form
      className="space-y-4 rounded-2xl bg-surface-container-low p-6 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="space-y-1.5">
        <label
          className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider"
          htmlFor="chancellery-email"
        >
          Designated Diplomatic / Institutional Station
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">
            mail
          </span>
          <input
            className="w-full rounded-full bg-surface-container-lowest pl-12 pr-4 py-3.5 text-on-surface font-body-sm text-body-sm outline-none placeholder:text-on-surface-variant/50 shadow-sm focus:ring-2 focus:ring-primary"
            id="chancellery-email"
            placeholder="counsel@chancellery.gov.in"
            required
            type="email"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label
          className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider"
          htmlFor="sector-select"
        >
          Primary Research Interest
        </label>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">
            domain
          </span>
          <select
            className="w-full appearance-none rounded-full bg-surface-container-lowest pl-12 pr-10 py-3.5 text-on-surface font-body-sm text-body-sm outline-none shadow-sm focus:ring-2 focus:ring-primary"
            id="sector-select"
          >
            <option>Indo-Pacific & Maritime Corridors</option>
            <option>Critical Minerals & Supply Chains</option>
            <option>China Strategic & Frontier Digest</option>
            <option>West Asia & Post-Carbon Energy</option>
            <option>Tech & Cyber Sovereignty</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 text-on-surface-variant pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>
      </div>
      <button
        className="w-full rounded-full bg-primary-container py-3.5 text-on-primary-container font-headline-sm text-body-md hover:bg-primary transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
        type="submit"
      >
        <span>Enroll in Strategic Wire</span>
        <span className="material-symbols-outlined text-[18px]">send</span>
      </button>
      {enrolled && (
        <p className="text-center font-label-caps text-label-caps text-primary font-bold pt-2">
          AUTHENTICATED: STATION ADDED TO DISPATCH ENCLAVE.
        </p>
      )}
    </form>
  );
}
