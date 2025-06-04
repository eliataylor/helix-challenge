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

    function githubLink(path: string, description: string) {
        const href = `https://github.com/eliataylor/helix-challenge/blob/master/stack/${path}`
        return (
            <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-500 hover:text-blue-700 ml-2"
            >
                → {description}
            </a>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Challenge Requirements</h1>

            {/* Drug Search Page Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">🔍 Drug Search Page</h2>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                    <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">A search input to look up drugs by name (partial matches supported)</span>
                            {githubLink("t3/src/app/_components/SearchBox.tsx", "t3/src/app/_components/SearchBox.tsx")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Display a list of results with drug name, approval status, and known side effects</span>
                            {githubLink("t3/src/app/search/page.tsx", "src/app/search/page.tsx - Search results")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Data fetched server-side using <s>getServerSideProps</s>  or API routes</span>
                            {githubLink("stack/t3/src/app/[segment]/page.tsx", "stack/t3/src/app/[segment]/page.tsx (server side rendering)")}
                            {githubLink("stack/t3/src/app/search/page.tsx", "stack/t3/src/app/search/page.tsx (client side requests)")}
                            {githubLink("t3/src/server/api/routers/search.bak.ts", "t3/src/server/api/routers/search.bak.ts (tRPC experiment)")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Use a mock REST API or a static JSON file</span>
                            {githubLink("django/schema.yaml", "For REST api - django/schema.yaml")}
                            {githubLink("stack/t3/src/server/api/routers/search.ts", "stack/t3/src/server/api/routers/search.ts")}
                        </div>
                    </div>
                </div>
            </div>

            {/* Drug Detail Page Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">🧬 Drug Detail Page</h2>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Route: /drug/[id]</span>
                            <span className="text-sm text-gray-500 ml-2">→ Dynamic [segment]/[id] routing to render any content type</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Use getStaticPaths + getStaticProps to statically generate drug pages</span>
                            {githubLink("stack/t3/src/app/[segment]/page.tsx", "uses generateStaticParams for static generation")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Display full info: Name, Approval Status, Manufacturer</span>
                            {githubLink("t3/src/app/_components/ContentTypes.tsx", "src/app/_components/ContentTypes.tsx - DrupCard + DrugDetails component")}
                            {githubLink("t3/src/object-actions/types/types.ts", "src/object-actions/types/types.ts - Drugs TS interface")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Clinical Trial Summary</span>
                            <span className="text-sm text-gray-500 ml-2">→ See /trails</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">List of Similar Drugs</span>
                            <span className="text-sm text-gray-500 ml-2">→ See /compare/[type]</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compare Drugs View Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Compare Drugs View (Bonus)</h2>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Let users select multiple drugs</span>
                            {githubLink("t3/src/app/compare/[type]/page.tsx", "src/app/compare/[type]/page.tsx - Compare page implementation")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Show a side-by-side comparison table with Side Effects, Trial Phases, Manufacturer</span>
                            {githubLink("t3/src/app/_components/ContentTypes.tsx", "src/app/_components/ContentTypes.tsx - DrugComparisonCard component")}
                            {githubLink("t3/src/types/types.ts", "src/types/types.ts - DrugComparisons interface")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Implement as a page or modal</span>
                            {githubLink("t3/src/app/compare/[type]/page.tsx", "src/app/compare/[type]/page.tsx - Dedicated comparison page")}
                        </div>
                    </div>
                </div>
            </div>

            {/* Requirements Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Requirements</h2>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Use TypeScript throughout</span>
                            <span className="text-sm text-gray-500 ml-2">→ All .tsx and .ts files in the codebase</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Use Next.js features: routing, data fetching, image optimization</span>
                            {githubLink("stack/t3/src/middleware.ts", "stack/t3/src/middleware.ts - middleware for authentication. skips api requests")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Clean, reusable components</span>
                            <span className="text-sm text-gray-500 ml-2">→ src/app/_components/ directory</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Fully responsive design</span>
                            {githubLink("t3/src/app/_components/Navigation.tsx", "t3/src/app/_components/Navigation.tsx - Responsive menus")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Use a styling approach (e.g., Tailwind CSS, styled-components, or CSS Modules)</span>
                            {githubLink("t3/src/app/_components/Button.tsx", "t3/src/app/_components/Button.tsx - Styled MUI components")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">Include unit tests for at least one key component (Jest + React Testing Library)</span>
                            {githubLink("t3/src/app/search/__tests__/page.test.tsx", "t3/src/app/search/__tests__/page.test.tsx - Search page tests")}
                            {githubLink("cypress/cypress/e2e/read-only/navigate-drawer.cy.js", "cypress/cypress/e2e/read-only/navigate-drawer.cy.js - cypress tests")}
                        </div>
                    </div>
                </div>
            </div>

            {/* What to Submit Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">📁 What to Submit</h2>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">A GitHub repo or zipped project folder</span>
                            <span className="text-sm text-gray-500 ml-2">→ https://github.com/eliataylor/helix-challenge</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">A short README with architecture & data-fetching decisions, known limitations or tradeoffs, and setup instructions</span>
                            {githubLink("README.md", "README.md")}
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CompletedIcon />
                        <div className="flex flex-col">
                            <span className="text-gray-700">*(Optional)* A Loom or video (max 5 mins) walking through your app</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenge;