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

  if (languages) {
    return (
      <div className="relative">
        <button
          ref={refButton}
          onClick={() => setIsOpened(!isOpened)}
          className="rounded-md bg-indigo-500 px-10 py-1 active:bg-indigo-600"
        >
          {Object.entries(languages).find(([_, code]) => code === value)?.[0]}
        </button>
        {isOpened && (
          <div className="absolute z-20 left-0 top-[105%] max-h-[300px] w-full divide-y-2 divide-indigo-400 overflow-scroll overflow-x-hidden rounded bg-indigo-500">
            {Object.entries(languages).map(([language, code]) => (
              <button
                onClick={() => changeLanguage(language)}
                className="flex w-full items-center justify-between  px-1 py-2 "
                key={code}
              >
                {language}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default SelectLanguage;
