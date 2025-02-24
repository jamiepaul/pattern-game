import { useState } from 'react';

export function useStreak() {
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  function resetStreak() {
    setStreak(0);
  }

  function incrementStreak() {
    const nextStreak = streak + 1;
    setStreak(nextStreak);
    if (nextStreak > longestStreak) {
      setLongestStreak(nextStreak);
    }
  }

  return {
    streak,
    longestStreak,
    resetStreak,
    incrementStreak
  };
}
