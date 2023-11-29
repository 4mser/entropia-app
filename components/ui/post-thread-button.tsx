import Link from "next/link";

function PostThreadButton() {
  const button = {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Crear Post",
  };

  return (
    <div className="fixed md:hidden  bottom-20 max-sm:bottom-16 shadow-md right-6 rounded-full bg-cyan-700 overflow-hidden">
      <Link href={button.route} className="w-full h-full flex items-center justify-center p-3">
          <img src={button.imgURL} alt={button.label} />
      </Link>
    </div>
  );
}

export default PostThreadButton;
