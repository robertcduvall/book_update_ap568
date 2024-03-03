import Crossword from "@/components/crossword";
import CurrentDate from "@/components/date";
import Leaderboard from "@/components/leaderboard";


export default function Home() {
  return (
    <main className="index-background">
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
