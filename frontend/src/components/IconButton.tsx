
interface IconButtonProps {
   
    onClick: () => void;
    icon: React.ReactNode;
    className?: string; // Optional icon
    
  }

function IconButton({ onClick, icon, className}: IconButtonProps) {

    return <button className={`button ${className} flex items-center justify-center py-2 px-3 uppercase font-bold border-2 text-lg rounded-3xl cursor-pointer`} onClick={onClick}>
        {icon}    
    </button>
}

export default IconButton;