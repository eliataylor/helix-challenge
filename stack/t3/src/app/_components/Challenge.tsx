import { type FC } from "react";

const CompletedIcon = () => (
  <div className="flex-shrink-0 mt-1">
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
);

const HalfCheckedIcon = () => (
  <div className="flex-shrink-0 mt-1">
    <svg
      className="w-5 h-5 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 12H6"
      />
    </svg>
  </div>
);

const NotCompletedIcon = () => (
  <div className="flex-shrink-0 mt-1">
    <svg
      className="w-5 h-5 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
    </svg>
  </div>
);

const Challenge: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Challenge Requirements</h1>

      {/* Drug Search Page Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🔍 Drug Search Page</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
          <HalfCheckedIcon />
            <span className="text-gray-700">A search input to look up drugs by name (partial matches supported)</span>
          </div>
          <div className="flex items-start gap-3">
            <HalfCheckedIcon />
            <span className="text-gray-700">Display a list of results with drug name, approval status, and known side effects</span>
          </div>
          <div className="flex items-start gap-3">
            <NotCompletedIcon />
            <span className="text-gray-700">Data fetched server-side using getServerSideProps or API routes</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Use a mock REST API or a static JSON file</span>
          </div>
        </div>
      </div>

      {/* Drug Detail Page Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🧬 Drug Detail Page</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Route: /drug/[id]</span>
          </div>
          <div className="flex items-start gap-3">
            <HalfCheckedIcon />
            <span className="text-gray-700">Use getStaticPaths + getStaticProps to statically generate drug pages</span>
          </div>
          <div className="flex items-start gap-3">
          <CompletedIcon />
            <span className="text-gray-700">Display full info: Name, Approval Status, Manufacturer</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Clinical Trial Summary</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">List of Similar Drugs</span>
          </div>
        </div>
      </div>

      {/* Compare Drugs View Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Compare Drugs View (Bonus)</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
          <CompletedIcon />
            <span className="text-gray-700">Let users select multiple drugs</span>
          </div>
          <div className="flex items-start gap-3">
          <CompletedIcon />
            <span className="text-gray-700">Show a side-by-side comparison table with Side Effects, Trial Phases, Manufacturer</span>
          </div>
          <div className="flex items-start gap-3">
          <CompletedIcon />
            <span className="text-gray-700">Implement as a page or modal</span>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Requirements</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Use TypeScript throughout</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Use Next.js features: routing, data fetching, image optimization</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Clean, reusable components</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Fully responsive design</span>
          </div>
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">Use a styling approach (e.g., Tailwind CSS, styled-components, or CSS Modules)</span>
          </div>
          <div className="flex items-start gap-3">
          <CompletedIcon />
            <span className="text-gray-700">Include unit tests for at least one key component (Jest + React Testing Library)</span>
          </div>
        </div>
      </div>

      {/* What to Submit Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">📁 What to Submit</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <CompletedIcon />
            <span className="text-gray-700">A GitHub repo or zipped project folder</span>
          </div>
          <div className="flex items-start gap-3">
            <HalfCheckedIcon />
            <span className="text-gray-700">A short README with architecture & data-fetching decisions, known limitations or tradeoffs, and setup instructions</span>
          </div>
          <div className="flex items-start gap-3">
            <NotCompletedIcon />
            <span className="text-gray-700">*(Optional)* A Loom or video (max 5 mins) walking through your app</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;