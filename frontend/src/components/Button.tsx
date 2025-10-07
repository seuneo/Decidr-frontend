
interface ButtonProps {
    text?: string;
    onClick: () => void;
    icon?: React.ReactNode;
    className?: string; // Optional icon
    disabled?: boolean;
  }

function Button({ text, onClick, icon, className, disabled }: ButtonProps) {

    return <button disabled={disabled} className={`button ${className} flex items-center justify-center py-1 w-full uppercase font-bold border-2 text-lg rounded-2xl whitespace-nowrap cursor-pointer`} onClick={onClick}>
        <span className="mr-2">{icon}</span>
        
           {text} 
        
    </button>
}

export default Button;