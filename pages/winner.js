import Leaderboard from "@/components/leaderboard";
import CountdownTimer from "@/components/timer";
import Confetti from 'react-confetti'


export default function Winner() {
  return (
    <main className="winner-background">
      <div>
      <Confetti width={2000} height={2000}/>
      <Leaderboard></Leaderboard>
      </div>
      <div className="leaderboard-under-container">
        <div className="leaderboard-under-header">
          <h2>Come Back Tomorrow</h2>
          <CountdownTimer></CountdownTimer>
        </div>
      </div>
    </main>
  );
}
