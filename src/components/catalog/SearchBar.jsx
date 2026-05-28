export default function SearchBar({value, onChange}) {
    return(
        <input type="text" 
        placeholder='Pesquisar produtos...' 
        value={value} 
        onChange={e => onChange(e.target.value)}
        />
    );
}