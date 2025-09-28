
interface ButtonProps {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
    className?: string; // Optional icon
  }

function Button({ text, onClick, icon, className }: ButtonProps) {

    return <button className={`button ${className} w-fulluppercase font-bold border-2 py-6 text-lg rounded-2xl`} onClick={onClick}>
        <span className="mr-3">{icon}</span>
        {text}
    </button>
}

export default Button;