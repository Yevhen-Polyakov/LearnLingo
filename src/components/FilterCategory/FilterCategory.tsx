import { useId} from "react";
import css from "./FilterCategory.module.css"
import { IoChevronDownSharp } from "react-icons/io5";

type Props = {
    languages: string[];
    levels: string[];
    prices: number[];

    language: string;
    level: string;
    price: string;

    onLanguageChange: (language: string) => void;
    onLevelChange: (level: string) => void;
    onPrice: (price: string) => void;
}

const FilterCategory = ({
    language, 
    level, 
    price, 
    languages, 
    levels, 
    prices, 
    onLanguageChange, 
    onPrice, 
    onLevelChange}: Props) => {
   
    
    const langId = useId()
    const levelID = useId()
    const priceId = useId()

    return (
        <section className={css.filterWrap}>
            <form  className={css.form}>
                <label htmlFor={langId} className={css.label}>Languages
                    <select 
                        className={`${css.select} ${language ? css.activeSelect : ""}`}
                        value={language}
                        onChange={(e) => {
                            onLanguageChange(e.target.value);
                            e.currentTarget.blur();
                        }}
                        name="Languages" 
                        id={langId}>
                    
                        <option
                            className={language === "" ? css.activeSelect : undefined}
                            value=""
                        >
                            All languages
                        </option>
                            {languages.map((languageOption) => (
                                <option
                                    className={language === languageOption ? css.activeSelect : undefined}
                                    key={languageOption}
                                    value={languageOption}>
                                    {languageOption}
                                </option>
                            ))}
                    </select>
                    <IoChevronDownSharp className={css.icon} />
                </label>

                <label htmlFor={levelID} className={css.label}>Level of knowledge
                    <select
                        className={`${css.select} ${level ? css.activeSelect : ""}`}
                        value={level}
                        onChange={(e) => {
                            onLevelChange(e.target.value);
                            e.currentTarget.blur();
                        }}
                        name="Level" 
                        id={levelID}>

                        <option
                            className={level === "" ? css.activeSelect : undefined}
                            value=""
                        >
                            All level
                        </option>
                            {levels.map((levelOption) => (
                                <option 
                                    className={level === levelOption ? css.activeSelect : undefined}
                                    key={levelOption}
                                    value={levelOption}>
                                        {levelOption}
                                </option>
                            ))}
                    </select>
                    <IoChevronDownSharp className={css.icon} />
                </label>

                <label htmlFor={priceId} className={css.label}>Price
                    <select
                        className={`${css.select} ${price ? css.activeSelect : ""}`}
                        value={price}
                        onChange={(e) => {
                            onPrice(e.target.value);
                            e.currentTarget.blur();
                        }}
                        name="Price" 
                        id={priceId}>

                        <option
                            className={price === "" ? css.activeSelect : undefined}
                            value=""
                        >
                            Any Price
                        </option>  
                            {prices.map((priceOption)=> (
                                <option
                                    className={price === String(priceOption) ? css.activeSelect : undefined}
                                    key={priceOption}
                                    value={priceOption}>
                                    {priceOption} $
                                </option>
                            ))}
                    </select>
                    <IoChevronDownSharp className={css.icon} />
                </label>
            </form>
        </section>
    )
}

export default FilterCategory