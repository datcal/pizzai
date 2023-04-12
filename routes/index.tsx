import { Head } from "$fresh/runtime.ts";
import Question  from "../islands/Question.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>pizzAI</title>
        <style>
          {`
            body {

            }
          `}
        </style>
      </Head>
      <div className="flex flex-col p-4 mx-auto max-w-screen-md md:py-10 h-full">
        <main>
          <Question />
        </main>
        <footer className="text-gray-500 text-xs text-center pt-10 pb-2 md:text-right">
          Open Sourced on <a href="https://github.com/datcal/pizzai">GitHub</a>.
        </footer>
      </div>
    </>
  );
}
