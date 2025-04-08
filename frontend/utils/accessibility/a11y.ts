export const handleEnterKey = (
  e: React.KeyboardEvent<HTMLElement>,
  callback: () => void
) => {
  if (e.key === "Enter") {
    callback();
  }
};
