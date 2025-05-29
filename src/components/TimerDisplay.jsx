import { Code, Coffee, PauseCircle, PlayCircle, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const TIMER_MODES = {
  WORK: 'WORK',
  BREAK: 'BREAK',
};

const DEFALUT_DURATION = {
  [TIMER_MODES.WORK]: 25 * 60,
  [TIMER_MODES.BREAK]: 5 * 60,
};

export const TimerDisplay = () => {
  const [mode, setMode] = useState(TIMER_MODES.WORK);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(DEFALUT_DURATION[mode]);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [customDurations, setCustomDurations] = useState({
    [TIMER_MODES.WORK]: 25,
    [TIMER_MODES.BREAK]: 5,
  });

  const timerRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleTimerComplete = useCallback(() => {
    const newMode =
      mode === TIMER_MODES.WORK ? TIMER_MODES.BREAK : TIMER_MODES.WORK;
    const newDuration = DEFALUT_DURATION[newMode];

    setMode(newMode);
    setTimeRemaining(newDuration);
    if (mode === TIMER_MODES.WORK) setCompletedCycles((prev) => prev + 1);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, handleTimerComplete]);

  useEffect(() => {
    const newDuration = customDurations[mode] * 60;
    setTimeRemaining(newDuration);
  }, [mode, customDurations]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTimeRemaining(customDurations[mode] * 60);
    setIsRunning(false);
  };

  const switchMode = (newMode) => {
    if (newMode !== mode) {
      setMode(newMode);
      setIsRunning(false);
    }
  };

  const handleDurationChange = (modeType, value) => {
    const parsedValue = parseInt(value) || 1;
    const newValue = Math.max(1, Math.min(60, parsedValue));

    setCustomDurations((prev) => ({
      ...prev,
      [modeType]: newValue,
    }));

    if (mode === modeType && !isRunning) setTimeRemaining(newValue);
  };

  const calculateProgress = () => {
    const totalDuraiton = customDurations[mode] * 60;
    return ((totalDuraiton - timeRemaining) / totalDuraiton) * 100;
  };

  return (
    <div>
      {/* Audio element for timer completion sound */}

      <div>
        {/* Header */}
        <div>
          <h1>ポモドーロタイマー</h1>
        </div>

        {/* Timer display */}
        <div>
          {/* Mode Selector */}
          <div>
            <button onClick={() => switchMode(TIMER_MODES.WORK)}>
              <Code size={18} />
              作業
            </button>
            <button onClick={() => switchMode(TIMER_MODES.BREAK)}>
              <Coffee size={18} />
              休憩
            </button>
          </div>

          {/* Timer Settings */}
          <div>
            <div>
              <label htmlFor="work-duration">作業時間 (分)</label>
              <input
                id="work-duration"
                type="number"
                value={customDurations[TIMER_MODES.WORK]}
                onChange={(e) =>
                  handleDurationChange(TIMER_MODES.WORK, e.target.value)
                }
                disabled={isRunning}
                min="1"
                max="60"
              />
            </div>
            <div>
              <label htmlFor="break-duration">休憩時間 (分)</label>
              <input
                id="break-duration"
                type="number"
                value={customDurations[TIMER_MODES.BREAK]}
                onChange={(e) =>
                  handleDurationChange(TIMER_MODES.BREAK, e.target.value)
                }
                disabled={isRunning}
                min="1"
                max="60"
              />
            </div>
          </div>

          {/* Time Display */}
          <div>
            <div>{formatTime(timeRemaining)}</div>
            <div>
              現在のモード: {mode === TIMER_MODES.WORK ? '作業' : '休憩'}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ width: `${calculateProgress()}%` }}></div>
          </div>

          {/* Controls */}
          <div>
            <button onClick={toggleTimer}>
              {isRunning ? <PauseCircle size={36} /> : <PlayCircle size={36} />}
            </button>
            <button onClick={resetTimer}>
              <RefreshCw size={36} />
            </button>
          </div>
        </div>

        {/* Stats Footer */}
        <div>
          <div>
            完了したサイクル数: <span>{completedCycles}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
