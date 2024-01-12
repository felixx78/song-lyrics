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

  return (
    <button
      onClick={handleReverse}
      className={`${
        isReversed ? "border-indigo-600" : "border-indigo-500"
      } w-[130px] rounded-md border-2 py-1 text-center`}
    >
      {isReversed ? "Reversed" : "Reverse"}
    </button>
  );
}
export default ReverseButton;
