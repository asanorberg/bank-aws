export default function Button({ children, onClick }) {
  return (
    <button
      type="button"
      className="flex-col text-[14px] justify-center items-center w-[160px] h-[30px] bg-blue-600 p-6 text-white border-none rounded-lg mt-8 hover:bg-blue-700 active:bg-blue-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
