function ReverseButton({
  isReversed,
  setIsReversed,
}: {
  isReversed: boolean;
  setIsReversed: (isReversed: boolean) => void;
}) {
  const handleReverse = () => {
    setIsReversed(!isReversed);
    localStorage.setItem("isReversed", JSON.stringify(!isReversed));
  };

  if (isReversed) {
    return (
      <button
        onClick={handleReverse}
        className="rounded-md bg-indigo-800 px-8 py-1"
      >
        Reversed
      </button>
    );
  }

  return (
    <button
      onClick={handleReverse}
      className="rounded-md bg-indigo-500 px-9 py-1"
    >
      Reverse
    </button>
  );
}
export default ReverseButton;
