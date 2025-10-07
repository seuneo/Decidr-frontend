
interface IconProps {
    icon: React.ReactNode;
    className?: string;
  }

function Icon({icon, className}: IconProps) {

    return <div className={` ${className} logo w-16 h-16 rounded-3xl shadow-sm`}>
           {icon}   
    </div>

}

export default Icon;