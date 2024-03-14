import Crossword from "@/components/crossword";
import CurrentDate from "@/components/date";
import Head from "next/head";

export default function Winner() {
    return (
        <main className="index-background">
      <Head>
        <title>Anatomy Crossword</title>
      </Head>
        <div className="crossword-title">
    
        <h> <CurrentDate></CurrentDate>
        </h>
        </div>
          <div>
          <Crossword></Crossword>
          </div>
        </main>
      );
    }
    