
interface TextBoxProps {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; // Optional icon
    
  }

function TextBox({ value, placeholder, onChange, className }: TextBoxProps) {

    return <input className={`${className} border-[#3D405B] bg-white w-full rounded-2xl p-3`} value={value} name="question" type="text" placeholder={placeholder} onChange={onChange}/>

}

export default TextBox;