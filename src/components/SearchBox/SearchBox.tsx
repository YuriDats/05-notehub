import css from "./SearchBox.module.css";

interface SearchBoxProps{
    text?: string;
    onChange: (value: string) => void;
}


export default function SearchBox ({text, onChange}: SearchBoxProps){
    return(
        <input className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={text}
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{onChange(event.target.value)}}
        />

        
    )
}