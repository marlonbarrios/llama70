export default function EmptyState({ setOpen, setPrompt }) {
  return (
    <div className="mt-12 sm:mt-24 space-y-6 text-gray-400 text-base mx-8 sm:mx-4 sm:text-2xl leading-12">
      {/* <p>
        {" "}
        Customize Llama&apos;s personality by clicking the{" "}
        <button
          className="prompt-button inline-flex items-center "
          onClick={() => setOpen(true)}
        >
          settings{" "}
        </button>{" "}
        button.
      </p> */}
      <p>
        My name is Sati-AI and I am an AI buddhist wisdom guide and meditation coach. You can ask me any questions about Buddhism, you meditation practice and I will try to answer them.
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Explain the most important Buddhist concepts or the main lists"
            )
          }
        >
          I can explain concepts from early Buddhism
        </button>
        , write{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt("Write a poem about Buddhist wisdom and compassion")
          }
        >
          poems as teachings
        </button>{" "}
        and{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Teach me in Palī, the language of the Buddha, about what you consider to be the most important Buddhist concepts"
            )
          }
        >
         Quote from the Pali Canon
        </button>
        ,{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Create riddles about Buddhist concepts and teachings"
            )
          }
        >
         riddles 
        </button>
        or even{" "}
        <button
          className="prompt-button"
          onClick={() =>
            setPrompt(
              "Why large language models are important example of Sunyata"
            )
          }
        >
        AI and Sunyata
        </button>{" "}
      </p>
    
    </div>
  );
}
