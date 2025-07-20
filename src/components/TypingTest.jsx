import React, { useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';

function TypingTest() {
  const startBtn = useRef(null);
  const endBtn = useRef(null);
  const typingInput = useRef(null);
  const difficultySelect = useRef(null);
  const durationVal = useRef(null);
  const wpmVal = useRef(null);
  const accuracyVal = useRef(null);
  const someText = useRef(null);
  const resetBtn = useRef(null);
  const helpBtn = useRef(null);
  const helpDiv = useRef(null);
  const timerRef = useRef(null);
  const initialDuration = useRef(0);
  const startTime = useRef(null);



  let currentTime = 0;
  let n = 0;
  let startTyping = false;
  function handleTimeSelection(e) {
    const selectedTime = parseInt(e.target.value);
    initialDuration.current = selectedTime;
    if (durationVal.current && !startTyping) {
      durationVal.current.textContent = selectedTime;
      currentTime = selectedTime;
      document.querySelectorAll(".duration-btn").forEach(btn =>
        btn.classList.remove("active")
      );
      e.target.classList.add("active");
    }
  }
  function startTypingTest() {
    const selectedDifficulty = difficultySelect.current.value;
    const selectedTime = durationVal.current.textContent;

    if (
      typingInput.current &&
      selectedDifficulty !== "Select" &&
      selectedTime !== "0" &&
      startTyping === false
    ) {
      typingInput.current.removeAttribute("disabled");
      resetBtn.current.setAttribute("disabled", true);
      startBtn.current.setAttribute("disabled", true);
      helpBtn.current.setAttribute("disabled", true);
      endBtn.current.removeAttribute("disabled");
      resetBtn.current.style.cursor = "not-allowed";
      startBtn.current.style.cursor = "not-allowed";
      helpBtn.current.style.cursor = "not-allowed";
      endBtn.current.style.cursor = "pointer";
      typingInput.current.focus();
      startTime.current = Date.now();

      textGenerator();
      wpmGenerator();
      accuracyGenerator();

      currentTime = parseInt(selectedTime);

      timerRef.current = setInterval(() => {
        currentTime -= 1;
        if (durationVal.current) {
          durationVal.current.textContent = currentTime;
        }

        if (currentTime <= 0) {
          clearInterval(timerRef.current);
          endTypingTest();
        }
      }, 1000);

      startTyping = true;
    }

    else if (
      typingInput.current &&
      selectedDifficulty !== "Select" &&
      selectedTime === "0" &&
      startTyping === false
    ) {
      typingInput.current.removeAttribute("disabled");
      resetBtn.current.setAttribute("disabled", true);
      startBtn.current.setAttribute("disabled", true);
      helpBtn.current.setAttribute("disabled", true);
      endBtn.current.removeAttribute("disabled");
      resetBtn.current.style.cursor = "not-allowed";
      startBtn.current.style.cursor = "not-allowed";
      helpBtn.current.style.cursor = "not-allowed";
      endBtn.current.style.cursor = "pointer";
      typingInput.current.focus();
      startTime.current = Date.now();

      textGenerator();
      wpmGenerator();
      accuracyGenerator();

      if (durationVal.current) {
        durationVal.current.textContent = "∞";
      }

      timerRef.current = setInterval(() => {
        wpmGenerator();
        accuracyGenerator();
      }, 1000);

      startTyping = true;
    }

    else {
      alert("Please select or reset a Difficulty and Duration before starting the test.");
    }
  }

  function endTypingTest() {
    const currentDuration = durationVal.current.textContent;

    typingInput.current.setAttribute("disabled", true);
    wpmGenerator();
    accuracyGenerator();

    clearInterval(timerRef.current);

    resetBtn.current.removeAttribute("disabled");
    startBtn.current.removeAttribute("disabled");
    helpBtn.current.removeAttribute("disabled");
    endBtn.current.setAttribute("disabled", true);

    resetBtn.current.style.cursor = "pointer";
    startBtn.current.style.cursor = "pointer";
    helpBtn.current.style.cursor = "pointer";
    endBtn.current.style.cursor = "not-allowed";

    if (currentDuration === "∞") {
      durationVal.current.textContent = "0";
    }

    difficultySelect.current.value = "Select";
    document.querySelectorAll(".duration-btn").forEach(btn =>
      btn.classList.remove("active")
    );
    alert(
      "-- Your Result --\n" +
      "WPM: " + wpmVal.current.textContent + "\n" +
      "Accuracy: " + accuracyVal.current.textContent
    );

    startTyping = false;
  }

  function textGenerator() {
    const difficulty = difficultySelect.current.value;
    let selectedText = "";
    const easy = [
      "The dog ran across the yard while the cat watched from the window. Kids played with a red ball and laughed. It was a bright day with a soft breeze blowing around gently.",
      "She likes to read books under the tree. The leaves move in the wind. Birds fly over the blue sky. Everything feels calm and peaceful. Typing these words helps you learn new skills.",
      "Typing every day will help you get faster. Start slow and use both hands. Do not rush. Keep going and you will see great results soon. Make it fun and keep learning more.",
      "He walks to school with his friends. They talk about games and laugh all the way. The weather is nice and cool. Everyone enjoys the walk. Learning to type is just like that.",
      "The sun is shining and the birds are singing. The flowers are blooming and the trees are green. It is a beautiful day to be alive. Learning to type is a gift that keeps on giving."
    ];

    const medium = [
      "Typing is a valuable skill that improves efficiency and productivity. With regular practice, you can achieve both speed and accuracy. Avoid looking at the keyboard. Focus on the task at hand, and you will get better results.",
      "Bananas are berries, but strawberries are not. Welcome to the weird world of botany where logic sleeps. Next time you eat a banana, just remember you are munching on a berry. Typing that fact is just as weird as the fact itself.",
      "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, and one to the body. When they swim, one heart stops. Imagine that happening during a job interview. Sorry I cannot move, my heart is on a break!",
      "While typing, posture plays a key role. Sit up straight, place both feet flat on the ground, and rest your wrists gently. This helps reduce fatigue and increases focus. A good environment can boost your typing performance and endurance.",
      "Sharks existed before trees. They have been swimming around for over 400 million years. Meanwhile, you just started this typing test a few seconds ago. Do not worry, you will catch up eventually. Unless the shark takes the test too."
    ];

    const hard = [
      "Success is not built on motivation alone but on discipline. Motivation gets you started but discipline keeps you going when excitement fades. Type like you mean it and each word is a step toward building the version of yourself that does not quit easily.",
      "Discipline is choosing between what you want now and what you want most. Growth never feels easy but it is always worth it. Every effort compounds and even the smallest action today plants the seeds for a stronger wiser version of yourself tomorrow.",
      "Success often hides behind boring routines and quiet consistency. It is built in the hours no one sees and the effort no one applauds. Stay committed to the process. Your dedication even in silence is what separates fleeting motivation from true achievement.",
      "Every master was once a beginner who refused to give up. The keyboard like life rewards those who return to it daily. Progress may feel invisible at first but over time it becomes impossible to miss. Keep typing until you are writing more than words.",
      "You do not rise to the level of your goals if you fall to the level of your habits. Master the small things with care and the big things will follow. Growth is slow but real change happens one focused intentional action at a time."
    ];

    if (difficulty === "easy") {
      selectedText = easy[Math.floor(Math.random() * easy.length)];
    } else if (difficulty === "medium") {
      selectedText = medium[Math.floor(Math.random() * medium.length)];
    } else if (difficulty === "hard") {
      selectedText = hard[Math.floor(Math.random() * hard.length)];
    }

    if (someText.current) {
      someText.current.textContent = selectedText;
    }
  }
  function reSet() {
    someText.current.textContent = "Some Text will appear here ...";
    typingInput.current.value = "";
    durationVal.current.textContent = "0";
    wpmVal.current.textContent = "0";
    accuracyVal.current.textContent = "0";
    difficultySelect.current.value = "Select";
    document.querySelectorAll(".duration-btn").forEach(btn =>
      btn.classList.remove("active")
    );
  }
  function showHideHelp() {
    if (helpDiv.current && n == 0) {
      helpDiv.current.style.display = 'flex';
      n = 1;
    } else {
      helpDiv.current.style.display = 'none';
      n = 0;
    }
  }
  function wpmGenerator() {
    const typedText = typingInput.current.value.trim();
    const wordsTyped = typedText === "" ? 0 : typedText.split(/\s+/).filter(Boolean).length;

    if (startTime.current && wpmVal.current) {
      const now = Date.now();
      const elapsedSeconds = (now - startTime.current) / 1000;
      const minutes = elapsedSeconds / 60;

      if (minutes > 0 && isFinite(minutes)) {
        const wpm = Math.round(wordsTyped / minutes);
        wpmVal.current.textContent = wpm;
      }
    }
  }
  function accuracyGenerator() {
    const target = someText.current.textContent.trim();
    const typed = typingInput.current.value.trim();

    const correctChars = typed
      .split('')
      .filter((char, i) => char === target[i])
      .length;

    const accuracy = typed.length
      ? Math.round((correctChars / typed.length) * 100)
      : 0;

    accuracyVal.current.textContent = `${accuracy}%`;
  }

  return (
    <div className="min-h-screen w-full bg-gray-300 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-500 rounded-lg shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gray-800 text-white p-6">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-blue-500">Key</span>
            <span className="text-yellow-500 ml-2">Blitz</span>
          </h1>
          <p className="text-xl font-bold text-orange-200 mt-2 text-center">
            Let's test your typing speed ...
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <p className="text-4xl font-bold text-green-700" ref={wpmVal}>0</p>
            <div className="text-gray-800 mt-1">Words/Min(WPM)</div>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <p className="text-4xl font-bold text-orange-700" ref={accuracyVal}>0%</p>
            <div className="text-gray-800 mt-1">Accuracy(%)</div>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg text-center">
            <span className="flex items-center justify-center"><p className="text-4xl font-bold text-red-700" ref={durationVal}>0</p><p className="mt-3 ml-1 font-bold">S</p></span>
            <div className="text-gray-800 mt-1">Seconds Left</div>
          </div>
        </div>

        {/* Typing Controls */}
        <div className="p-6 bg-gray-700 text-white">
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-bold">Select difficulty:</span>
              <select
                name="difficulty"
                id="difficulty"
                ref={difficultySelect}
                className="px-8 py-2 font-semibold rounded-md bg-blue-500 text-white hover:text-black transition duration-300 ease-in-out"
              >
                <option value="Select">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-bold">Select duration:</span>
              <div className="flex gap-2">
                <button
                  className="duration-btn font-semibold text-black bg-green-700 rounded px-3 p-1"
                  onClick={handleTimeSelection} value={30}
                >30s</button>
                <button
                  className="duration-btn font-semibold text-black bg-orange-500 rounded px-4 p-1"
                  onClick={handleTimeSelection} value={60}
                >60s</button>
                <button
                  className="duration-btn font-bold text-black bg-red-400 text-2xl rounded px-5 p-1"
                  onClick={handleTimeSelection} value={0}
                >∞</button>
              </div>
            </div>
          </div>

          {/* Text Display Box */}
          <div className="typing-text select-none bg-gray-400 p-4 rounded-lg border
           border-blue-400 mb-4 text-black font-semibold" id="text-display" ref={someText}
          >
            Some Text will appear here ...
          </div>

          {/* Typing Input Box */}
          <div className="relative">
            <textarea
              id="typing-input"
              className="w-full p-4 border-1 bg-gray-600 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
              placeholder="Start typing here when the test begins..."
              disabled
              ref={typingInput}
              onInput={wpmGenerator}
              onKeyDown={accuracyGenerator}
            />
          </div>
          {/* Help Div */}
          <div
            className="helpDiv flex flex-col bg-red-300 border-2 p-4 pt-2 rounded-lg border-black w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/4
             font-semibold max-h-[50vh] "
            id="helpModal"
            ref={helpDiv}
          >
            <p className="text-gray-800 mt-2 mb-1 font-bold text-2xl text-center">
              --  Help & Instructions --
            </p>

            <ol className="list-inside list-[lower-roman] space-y-2 text-black ml-4 text-sm sm:text-base">
              <li>
                Select a <span className="font-bold">difficulty</span> and a{" "}
                <span className="font-bold">duration</span>.
              </li>
              <li>
                Click the <span className="font-bold">"Start"</span> button to begin the test.
              </li>
              <li>Type the text that appears on the screen as accurately as possible.</li>
              <li>
                Click the <span className="font-bold">"Reset"</span> button anytime to restart
                the test.
              </li>
              <li>Good luck and have fun!</li>
            </ol>

            <p className="text-xl font-bold text-orange-600 text-center mt-3 mb-1">
              Typing Tips:
            </p>
            <ul className="list-disc list-inside text-black space-y-1 ml-4 text-sm sm:text-base">
              <li>Keep your fingers on the home row: A S D F (left) and J K L ; (right).</li>
              <li>Use all fingers and avoid looking at the keyboard.</li>
              <li>Maintain a straight posture and keep wrists relaxed.</li>
              <li>Accuracy is more important than speed. Speed will improve over time.</li>
            </ul>

            <p className="text-xl font-bold text-orange-600 text-center mt-3 mb-1">
              Scoring Info:
            </p>
            <ul className="list-disc list-inside text-black space-y-1 ml-4 text-sm sm:text-base">
              <li>
                <span className="font-semibold">WPM (Words Per Minute):</span> Based on how
                many correct words you typed per minute.
              </li>
              <li>
                <span className="font-semibold">Accuracy:</span> Calculated from the number of
                correct characters compared to the total typed.
              </li>
              <li>
                <span className="font-semibold">Mistakes:</span> Any wrong characters reduce
                accuracy and WPM.
              </li>
            </ul>

            <button
              className="text-lg bg-red-400 text-black font-bold p-2 mt-4 mb-2 hover:bg-red-700 rounded-lg "
              onClick={showHideHelp}
            >
              Close
              <i className="fa fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center space-x-3">
            <button
              id="start-btn"
              className="px-7 py-3 bg-green-400 text-black rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center space-x-2"
              ref={startBtn}
              onClick={startTypingTest}
            >
              <i className="fa fa-play"></i>
              <span>Start Test</span>
            </button>
            <button
              id="reset-btn"
              className="px-7 py-3 bg-orange-400 text-black rounded-lg font-bold hover:bg-orange-700 transition-colors flex items-center space-x-2"
              ref={resetBtn}
              onClick={reSet}
            >
              <i className="fa fa-refresh"></i>
              <span>Reset All</span>
            </button>
            <button
              id="start-btn"
              className="endbtn px-7 py-3 bg-red-400 text-black rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center space-x-2"
              ref={endBtn}
              onClick={endTypingTest}
            >
              <i className="fa fa-stop"></i>
              <span>End Test</span>
            </button>
            <button
              id="help-btn"
              className="px-7 py-3 text-center text-white rounded-lg font-bold  flex items-center space-x-2"
              ref={helpBtn}
              onClick={showHideHelp}
            >
              <i className="fa fa-question-circle"></i>
              <span className='hover:text-gray-900 hover:underline'>Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;
