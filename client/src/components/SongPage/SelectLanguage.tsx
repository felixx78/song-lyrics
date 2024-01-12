import { useEffect, useRef, useState } from "react";

function SelectLanguage({
  value,
  languages,
  onChange,
}: {
  value: string;
  languages: Record<string, string>;
  onChange: (language: string) => void;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const refButton = useRef<HTMLButtonElement>(null);

  const [focusedLanguages, setFocusedLanguages] = useState<[string, string][]>(
    [],
  );
  const [focusedLanguageIndex, setFocusedLanguageIndex] = useState(-1);
  const focusedLanguageRef = useRef<HTMLButtonElement>(null);

  const handleOnClick = (e: MouseEvent) => {
    if (refButton.current && !refButton.current.contains(e.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOnClick);

    return () => window.removeEventListener("click", handleOnClick);
  }, []);

  const changeLanguage = (language: string) => {
    onChange(languages[language]);
    localStorage.setItem("selectedLanguage", languages[language]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (focusedLanguages.length === 0) return;
      changeLanguage(focusedLanguages[focusedLanguageIndex][0]);
      setIsOpened(false);
      return;
    }

    if (e.key.toUpperCase() !== focusedLanguages?.[0]?.[0][0]) {
      const languagesFiltered = Object.entries(languages).filter(
        ([language, _]) => language.startsWith(e.key.toUpperCase()),
      );

      setFocusedLanguageIndex(0);
      setFocusedLanguages(languagesFiltered);
    } else if (focusedLanguageIndex === focusedLanguages.length - 1) {
      setFocusedLanguageIndex(0);
    } else {
      setFocusedLanguageIndex(focusedLanguageIndex + 1);
    }
  };

  useEffect(() => {
    if (focusedLanguageRef.current) {
      focusedLanguageRef.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
    }
  }, [focusedLanguageIndex, focusedLanguages]);

  const toggleMenu = () => {
    setIsOpened(!isOpened);
    setFocusedLanguages([]);
  };

  if (languages) {
    return (
      <div className="relative">
        <button
          onKeyDown={(e) => isOpened && onKeyDown(e)}
          ref={refButton}
          onClick={toggleMenu}
          className="rounded-md border-2 border-indigo-500 px-10 py-1 outline-none"
        >
          {Object.entries(languages).find(([_, code]) => code === value)?.[0]}
        </button>
        <div
          className={`${
            isOpened ? "top-[110%]" : "invisible top-3/4 opacity-0"
          } absolute left-0 z-20 max-h-[300px] w-full divide-y-2 divide-indigo-500 overflow-scroll overflow-x-hidden rounded border-2 border-indigo-500 bg-[#35335C] transition-all`}
        >
          {Object.entries(languages).map(([language, code]) => (
            <button
              onClick={() => changeLanguage(language)}
              className={`flex w-full items-center justify-between px-1 py-2 outline-none hover:bg-indigo-700 ${
                code === focusedLanguages[focusedLanguageIndex]?.[1] &&
                "bg-indigo-700"
              }`}
              key={code}
              ref={
                code === focusedLanguages[focusedLanguageIndex]?.[1]
                  ? focusedLanguageRef
                  : null
              }
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default SelectLanguage;
