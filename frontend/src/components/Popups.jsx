export function Popups({ msg, btnText, closePopup, variant = "error" }) {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <Iconsuccess />;
      case "error":
        return <Iconerror />;
      default:
        return Iconerror;
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
        <div className="bg-black opacity-70 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10">
          <div className="text-8xl flex flex-grow justify-center mb-3 ">
            {getIcon(variant)}
          </div>
          <h2 className="text-xl font-base">{msg}</h2>
          <div className="mt-4 flex">
            <button
              onClick={closePopup}
              className="bg-gray-300 font-bold text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 flex-grow"
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Iconsuccess() {
  return (
    <div className="text-green-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
        />
      </svg>
    </div>
  );
}

function Iconerror() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M13.728 1H6.272L1 6.272v7.456L6.272 19h7.456L19 13.728V6.272zM11 15H9v-2h2zm0-4H9V5h2z"
        />
      </svg>
    </div>
  );
}
